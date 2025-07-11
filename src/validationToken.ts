import jwt from 'jsonwebtoken';



export function isValidToken(token: string) {
    const secretKey = 'my_secret_key'; // тот же, что использовался при создании токена

    // const token = '...'; // токен, полученный от клиента

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log('Токен валиден:', decoded);
        return true;
    } catch (error) {
        // console.error('Невалидный токен:', error);
        return false;
    }

}
