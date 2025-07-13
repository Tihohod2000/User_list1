import {AppDataSource} from "./data-source";
import {User} from "./entity/User";
import bcrypt from "bcrypt";
import {hashPassword} from "./passwordCrypt";

export async function registration(
    userData: any) {

    // В объекте должно быть:
    // ФИО
    // Дата рождения
    // Email
    // пароль

    // Статус default true
    // Роль default user


    // Если есть все данные,
    // хэшировать пароль,
    // записать данные в БД


    if (!userData) {
        return undefined;
    }

    if(!userData.full_name) return undefined;
    if(!userData.birth_date) return undefined;
    if(!userData.email) return undefined;
    if(!userData.password) return undefined;

    console.log("Всё есть!!!");

    if(userData.full_name.split(" ").length != 3) {
        console.log("ФИО должно состоять из 3 слов");
        return undefined;
    }


    const passwordHash = await hashPassword(userData.password);

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({ email: userData.email });
    if (existingUser) {
        console.log("Пользователь с таким email уже существует");
        return undefined;
    }

    const newUser = new User();
    newUser.full_name = userData.full_name;
    newUser.birth_date = new Date(userData.birth_date);
    newUser.email = userData.email;
    newUser.password = passwordHash;
    newUser.is_active = true;
    newUser.role = 'user';

    await userRepository.save(newUser);

    console.log('Пользователь создан:', newUser);






}

