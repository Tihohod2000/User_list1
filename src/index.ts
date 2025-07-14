import express, {Request, Response} from 'express';
import {AppDataSource} from "./data-source"
import {seedAdmin} from "./seedAdmin";
import userRoutes from "./routes/user.routes";

const PORT = process.env["PORT "] || 3000;


const app = express();

app.use(express.json());

AppDataSource.initialize().then(async () => {

    await seedAdmin();

    app.use(express.json()); // Для парсинга JSON
    app.use(userRoutes);
    app.listen(PORT, () => {
        console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
    });

}).catch((err) => {
    console.log(err)
});

