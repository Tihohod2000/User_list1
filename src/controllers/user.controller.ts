import { Request, Response } from 'express';
import {registration} from "../registration";
import {authorization} from "../authorization";
import {getIdFromToken, isAdmin, isValidToken} from "../validationToken";
import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import {blockUser} from "../updataUser";


export const registrationUser = async (req: Request, res: Response) => {
    const data = req.body;

    enum message {
        "Success" = 1,
        "user already exists" = 2,
        "Error" = 3,
        "No data" = 4,
        "invalid data" = 5
    }

    const successful: number = await registration(data);
    let status: number = 500;

    switch (successful) {
        case message["Success"]:
            status = 201;
            break;
        case message["user already exists"]:
            status = 409;
            break;
        case message["No data"]:
            status = 400;
            break;
        case message["Error"]:
            status = 422;
            break;
        case message["invalid data"]:
            status = 400;


    }

    res.status(status).json({
        message: `${message[successful]}`,
    });


};

export const authorizationUser = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = {
        password: password,
        email: email,
    }

    const data = await authorization(user);


    if (!data) {
        res.status(500).json({
            message: "incorrect data or User not found!"
        })
    } else {

        console.log("tyuio")
        console.log(data.user.is_active)
        if (!data.user.is_active) {
            res.status(403).json({
                message: "user is blocked"
            })
            return;
        }
        res.status(200).json(
            {
                text: "authorization successful!",
                yourID: data.user.id,
                token: data.token,
            }
        );
    }

};

export const getUserList = async (req: Request, res: Response) => {
    const token = req.body.token;

    if (isValidToken(token)) {

        //сделать проверку, что это админ!!!!!!!!!
        if (isAdmin(token)) {
            // console.log("adminn")
            const userRepository = AppDataSource.getRepository(User)
            const users = await userRepository.find()
            // console.log(users);
            res.status(200).json(
                {
                    text: "getUserList successful!",
                    data: users
                }
            );
        } else {
            res.status(403).json({error: 'Ошибка доступа'})
        }


    } else {
        res.status(401).json({error: 'Не валидный токен'})
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const data = req.body;
    const id = data.id;
    const token = data.token;
    let userId;
    let admin = false


    if (isValidToken(token)) {
        if (isAdmin(token)) {
            admin = true
        }

        if (!admin) {
            userId = getIdFromToken(token)
            if (userId !== id) {
                res.status(403).json({error: 'Ошибка доступа'})
                return;
            }
        }


        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({id: id});

        res.status(200).json({user: user})


    } else {
        res.status(401).json({error: 'Не валидный токен'})
    }

};

export const BlockUser = async (req: Request, res: Response) => {

    const id = req.body.id;
    const token = req.body.token;

    if (!id || !token) {
        res.status(400).json({error: 'Ошибка'})
    }

    let userId = null;
    let admin = false;


    if (isValidToken(token)) {
        if (isAdmin(token)) {
            admin = true
        }

        if (!admin) {
            userId = getIdFromToken(token)
            if (userId !== id) {
                res.status(403).json({error: 'Ошибка доступа'})
                return;
            }
        }

        await blockUser(id)


        res.status(200).json({error: `Пользователь под id: ${id} заблокирован`})


    }
    res.status(500).json({error: 'Ошибка'})

};