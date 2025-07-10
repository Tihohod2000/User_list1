import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "postgres",
    synchronize: false, // авто-создание таблиц (не использовать в проде)
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})
