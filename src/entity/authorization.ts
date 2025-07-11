import jwt from 'jsonwebtoken';


export function authorization(payload: any) {

    const secretKey = 'my_secret_key';



    // const payload = {
    //     userId: 123,
    //     username: 'user',
    // };

// Генерация токена
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    console.log(token);

    return token;
}

