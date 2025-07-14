// src/seedAdmin.ts
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import {hashPassword} from "./passwordCrypt";

export async function seedAdmin() {
    const userRepository = AppDataSource.getRepository(User);

    const count = await userRepository.count();
    // console.log("Количество записей в бд");
    // console.log(count);
    if (count === 0) {
        const password = await hashPassword("123");
        const admin = new User();


        admin.full_name = "Admin";
        admin.birth_date = new Date();
        admin.email = "admin@mail.ru";
        admin.password = password;
        admin.is_active = true;
        admin.role = 'admin';

        await userRepository.save(admin);
        console.log("🟢 Администратор создан");
    }
}
