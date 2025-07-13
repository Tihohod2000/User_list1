import jwt from 'jsonwebtoken';
import {AppDataSource} from "./data-source";
import {User} from "./entity/User";
import {verifyPassword} from "./passwordCrypt";


export async function authorization(payload: any) {

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy(
        {
            email: payload.email
        });

    const isMatch = await verifyPassword(payload.password, String(user?.password))

    // console.log("point 1")
    if(!isMatch){
        return undefined;
    }
    console.log(user);


    if (user) {

        const secretKey = 'my_secret_key';

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email,
            },
            secretKey, {expiresIn: '1h'});

        console.log(token);

        return {
            token: token,
            user: user,
        };

    }
    return undefined;

    // throw new Error("User not found!");

    // const payload = {
    //     userId: 123,
    //     username: 'user',
    // };

// Генерация токена

}

