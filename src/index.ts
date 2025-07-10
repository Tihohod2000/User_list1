import express, {Request, Response} from 'express';
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

const PORT = 3000;


const app = express();

app.use(express.json());

AppDataSource.initialize().then(async () => {
    app.get('/', async (req: Request, res: Response) => {
        res.send('Привет от TypeScript сервера!');

        const userRepo = AppDataSource.getRepository(User)
        const users = await userRepo.find()
        console.log(users)

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

        // Получаем почту и хэш пароля
        // делаем запрос в базу данных,
        // если успешно найдены и хэш пароля и почта, то авторизация успешно

    });

    app.post('/getUserList', (req, res) => {
        res.status(200).json(
            {
                text: "getUserList successful!",
            }
        );
        // Только для админов
        // возвращать список пользователей
    });


    app.get('/getUserById', (req, res) => {
        res.status(200).json(
            {
                text: "getUserByID successful!",
            }
        );
        // возвращаем данные пользователя, если запрос пришёл от самого пользователя или от администратора
    });


    app.post('/BlockUser', (req, res) => {
        res.status(200).json(
            {
                text: "BlockUser successful!",
            }
        );
        // блокирует пользователя, если запрос пришёл от самого пользователя или от администратора
    });

    app.listen(PORT, () => {
        console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
    });

}).catch((err) => {console.log(err)});

