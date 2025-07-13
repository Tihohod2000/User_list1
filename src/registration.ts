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
        return 4;
    }

    if(!userData.full_name || !userData.birth_date || !userData.email || !userData.password) return 4;

    console.log("Всё есть!!!");

    if(userData.full_name.split(" ").length != 3) {
        console.log("ФИО должно состоять из 3 слов");
        return 5;
    }


    const passwordHash = await hashPassword(userData.password);

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({ email: userData.email });
    if (existingUser) {
        console.log("Пользователь с таким email уже существует");
        return 2;
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

    return 1;






}

