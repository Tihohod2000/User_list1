import express, {Request, Response} from 'express';
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

const PORT = 3000;


const app = express();

app.use(express.json());

AppDataSource.initialize().then(async () => {
    app.get('/', async (req: Request, res: Response) => {
        res.send('Привет от TypeScript сервера!');



    });


    app.post('/registration', (req: Request, res: Response) => {
        const data = req.body;
        const login = data.login;
        const password = data.password;
        console.log(login);
        console.log(password);

        res.status(200).json({
            message: "GET request successful!",
            // receivedText: text // Отправляем параметр обратно клиенту
        });

        // Registration(login, password).then(r => {
        //     res.status(200).json({
        //         message: "GET request successful!",
        //         // receivedText: text // Отправляем параметр обратно клиенту
        //     });
        // });


    });

    app.post('/authorization', (req, res) => {
        res.status(200).json(
            {
                text: "authorization successful!",
            }
        );

        // Получаем почту и пароль
        // Хешируем пароль
        // делаем запрос в базу данных по почте и хешу пароля,
        // если успешно найдены и хэш пароля и почта, то авторизация успешно
        // Пользователь должен получить токен

    });

    app.get('/getUserList', async (req, res) => {


        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()
        console.log(users);
        res.status(200).json(
            {
                text: "getUserList successful!",
                data: users
            }
        );
        // Только для админов
        // возвращать список пользователей
    });


    app.get('/getUserById', async (req, res) => {
        const data = req.body;
        const UserId = data.UserId;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: UserId });

        if(!user){
            res.status(404).json({error: 'Пользователь не найден'})
            return;
        }

        res.status(200).json(
            {
                user: user
            }
        );
        // возвращаем данные пользователя, если запрос пришёл от самого пользователя или от администратора
    });


    app.post('/BlockUser', async (req, res) => {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({id: 3})

        if(!user){
            res.status(404).json({error: 'Пользователь не найден'})
            return;
        }

        user.is_active = false;

        await userRepository.save(user);

        res.status(200).json(
            {
                text: "BlockUser successful!",
                user: user
            }
        );
        // блокирует пользователя, если запрос пришёл от самого пользователя или от администратора
    });

    app.listen(PORT, () => {
        console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
    });

}).catch((err) => {console.log(err)});

