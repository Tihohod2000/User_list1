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
    app.get('/', async (req: Request, res: Response) => {
        res.send('Привет от TypeScript сервера!');


    });


    app.post('/registration', async (req: Request, res: Response) => {
        const data = req.body;
        console.log(data);

        const successful = await registration(data);

        if(successful){
            res.status(200).json({
                message: "GET request successful!",
                // receivedText: text // Отправляем параметр обратно клиенту
            });
        }

        res.status(500).json({
            message: "incorrect data"
        })



        // Registration(login, password).then(r => {
        //     res.status(200).json({
        //         message: "GET request successful!",
        //         // receivedText: text // Отправляем параметр обратно клиенту
        //     });
        // });


    });

    app.post('/authorization', async (req, res) => {
        // isValidToken();

        // const data = req.body;
        const email = req.body.email;
        const password = req.body.password;

        // запрос в бд, после полученные данные вставлять в user

        // const userRepository = AppDataSource.getRepository(User);
        // const userDB = await userRepository.findOneBy({id: UserId});

        const user = {
            password: password,
            email: email,
        }

        const data = await authorization(user);


        if (!data) {
            res.status(500).json({
                message: "incorrect data or User not found!"
            })
        }else{
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
            if(isAdmin(token)){
                console.log("adminn")
                const userRepository = AppDataSource.getRepository(User)
                const users = await userRepository.find()
                console.log(users);
                res.status(200).json(
                    {
                        text: "getUserList successful!",
                        data: users
                    }
                );
            }else {
                res.status(404).json({error: 'Ошибка доступа'})
            }



        } else {
            res.status(404).json({error: 'Не валидный токен'})
        }


        // Только для админов
        // возвращать список пользователей
    });


    app.get('/getUserById', async (req, res) => {
        const data = req.body;
        const UserId = data.UserId;
        const token = data.token;


        if (isValidToken(token)) {

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({id: UserId});

            if (!user) {
                res.status(404).json({error: 'Пользователь не найден'})
                return;
            }

            res.status(200).json(
                {
                    user: user
                }
            );
        } else {
            res.status(404).json({error: 'Не валидный токен'})
        }


        // возвращаем данные пользователя, если запрос пришёл от самого пользователя или от администратора
    });


    app.post('/BlockUser', async (req, res) => {

        const id = req.body.id;
        const token = req.body.token;

        if(!id || !token){
            res.status(404).json({error: 'Ошибка'})
        }

        let userId = null;
        let admin = false;


        if(isValidToken(token)) {
            if(isAdmin(token)) {
                admin = true
            }

            if(!admin){
                userId = getIdFromToken(token)
                if(userId !== id){
                    res.status(404).json({error: 'Ошибка доступа'})
                    return;
                }
            }

            await blockUser(id)



            res.status(200).json({error: `Пользователь под id: ${id} заблокирован`})


        }

        // блокирует пользователя, если запрос пришёл от самого пользователя или от администратора
    });

    app.listen(PORT, () => {
        console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
    });

}).catch((err) => {
    console.log(err)
});

