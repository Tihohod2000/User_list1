import jwt from 'jsonwebtoken';
import {AppDataSource} from "./data-source";
import {User} from "./entity/User";
import {verifyPassword} from "./passwordCrypt";
import {AuthUserDto} from "./dto/auth-user.dto";


export async function authorization(payload: AuthUserDto) {

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy(
        {
            email: payload.email
        });

    const isMatch = await verifyPassword(payload.password, String(user?.password))

    if(!isMatch){
        return undefined;
    }


    if (user) {

        const secretKey = 'my_secret_key';

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email,
            },
            secretKey, {expiresIn: '1h'});


        return {
            token: token,
            user: user,
        };

    }
    return undefined;
}

