import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: parseInt(process.env["DB_PORT"] || "5432"),
    username: process.env["DB_USERNAME "] || "postgres",
    password: process.env["DB_PASSWORD "] || "12345",
    database: process.env["DB_DATABASE "] || "postgres",
    synchronize: true, // авто-создание таблиц (не использовать в проде)
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})
