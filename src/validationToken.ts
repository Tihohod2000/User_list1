import jwt from 'jsonwebtoken';


const secretKey = 'my_secret_key';



export function isValidToken(token: string) {
    // const secretKey = 'my_secret_key'; // тот же, что использовался при создании токена

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


export function isAdmin(token: string) {

    try {
        console.log('jopa');
        const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
        // console.log('Токен валиден:', decoded);
        if(decoded["role"] === 'admin'){
            return true;
        }else{
            return false;
        }


    } catch (error) {
        console.error('Невалидный токен:', error);
        return false;
    }

}

export function getIdFromToken(token: string) {
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    return decoded["id"];

}



