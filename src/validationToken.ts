import jwt from 'jsonwebtoken';


const secretKey = 'my_secret_key';



export function isValidToken(token: string) {

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
        const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
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



