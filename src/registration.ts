export async function Registration(
    login: string,
    password: string)
    {
        if(login == 'admin'){
            console.log(`${login} is logged in`);
        }

        if(password == '123'){
            console.log(`${password} password is incorrect`);
        }

    }