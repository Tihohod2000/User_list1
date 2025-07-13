import bcrypt from 'bcrypt';

// Хеширование пароля
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // чем больше — тем безопаснее, но медленнее
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
}

// Проверка пароля
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}


// Пример использования
// (async () => {
//     const password = '123';
//     const hashed = await hashPassword(password);
//
//     console.log('Хеш:', hashed);
//
//     const isMatch = await verifyPassword('123', hashed);
//     console.log('Совпадает?', isMatch);
// })();