import jwt from 'jsonwebtoken';
import {AppDataSource} from "../data-source";
import {User} from "./User";


export async function authorization(payload: any) {

    console.log(payload);

    const secretKey = 'my_secret_key';
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy(
        {
            email: payload.email
        });
    console.log(user);

    if (user) {



        const token = jwt.sign(
            {
                role: user.role,
                email: user.email,
            },
            secretKey, {expiresIn: '1h'});

        console.log(token);

        return token;
    }

    throw new Error("User not found!");

    // const payload = {
    //     userId: 123,
    //     username: 'user',
    // };

// Генерация токена

}

