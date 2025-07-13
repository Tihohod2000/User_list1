import express, {Request, Response} from 'express';
import {AppDataSource} from "./data-source"
import {User} from "./entity/User"
import {getIdFromToken, isAdmin, isValidToken} from "./validationToken"
import {authorization} from "./authorization";
import {registration} from "./registration";
import {blockUser} from "./updataUser";

const PORT = 3000;


const app = express();

app.use(express.json());

AppDataSource.initialize().then(async () => {

    app.post('/registration', async (req: Request, res: Response) => {
        const data = req.body;

        enum message {
            "Success" = 1,
            "user already exists" = 2,
            "Error" = 3,
            "No data" = 4,
            "invalid data" = 5
        }

        const successful: number = await registration(data);
        let status: number = 500;

        switch (successful) {
            case message.Success:
                status = 201;
                break;
            case message["user already exists"]:
                status = 409;
                break;
            case message["No data"]:
                status = 400;
                break;
            case message["Error"]:
                status = 422;
                break;
            case message["invalid data"]:
                status = 400;


        }

        res.status(status).json({
            message: `${message[successful]}`,
        });


    });

    app.post('/authorization', async (req, res) => {

        const email = req.body.email;
        const password = req.body.password;

        const user = {
            password: password,
            email: email,
        }

        const data = await authorization(user);


        if (!data) {
            res.status(500).json({
                message: "incorrect data or User not found!"
            })
        } else {

            console.log("tyuio")
            console.log(data.user.is_active)
            if (!data.user.is_active) {
                res.status(403).json({
                    message: "user is blocked"
                })
                return;
            }
            res.status(200).json(
                {
                    text: "authorization successful!",
                    yourID: data.user.id,
                    token: data.token,
                }
            );
        }


        // Получаем почту и пароль
        // Хешируем пароль
        // делаем запрос в базу данных по почте и хешу пароля,
        // если успешно найдены и хэш пароля и почта, то авторизация успешно
        // Пользователь должен получить токен

    });

    app.get('/getUserList', async (req, res) => {

        const token = req.body.token;

        if (isValidToken(token)) {

            //сделать проверку, что это админ!!!!!!!!!
            if (isAdmin(token)) {
                // console.log("adminn")
                const userRepository = AppDataSource.getRepository(User)
                const users = await userRepository.find()
                // console.log(users);
                res.status(200).json(
                    {
                        text: "getUserList successful!",
                        data: users
                    }
                );
            } else {
                res.status(403).json({error: 'Ошибка доступа'})
            }


        } else {
            res.status(401).json({error: 'Не валидный токен'})
        }


        // Только для админов
        // возвращать список пользователей
    });


    app.get('/getUserById', async (req, res) => {

        const data = req.body;
        const id = data.id;
        const token = data.token;
        let userId;
        let admin = false


        if (isValidToken(token)) {
            if (isAdmin(token)) {
                admin = true
            }

            if (!admin) {
                userId = getIdFromToken(token)
                if (userId !== id) {
                    res.status(403).json({error: 'Ошибка доступа'})
                    return;
                }
            }


            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({id: id});

            res.status(200).json({user: user})


        } else {
            res.status(401).json({error: 'Не валидный токен'})
        }


        // возвращаем данные пользователя, если запрос пришёл от самого пользователя или от администратора
    });


    app.post('/BlockUser', async (req, res) => {

        const id = req.body.id;
        const token = req.body.token;

        if (!id || !token) {
            res.status(400).json({error: 'Ошибка'})
        }

        let userId = null;
        let admin = false;


        if (isValidToken(token)) {
            if (isAdmin(token)) {
                admin = true
            }

            if (!admin) {
                userId = getIdFromToken(token)
                if (userId !== id) {
                    res.status(403).json({error: 'Ошибка доступа'})
                    return;
                }
            }

            await blockUser(id)


            res.status(200).json({error: `Пользователь под id: ${id} заблокирован`})


        }
        res.status(500).json({error: 'Ошибка'})


        // блокирует пользователя, если запрос пришёл от самого пользователя или от администратора
    });

    app.listen(PORT, () => {
        console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
    });

}).catch((err) => {
    console.log(err)
});

