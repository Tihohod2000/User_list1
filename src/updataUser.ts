import { AppDataSource } from './data-source'; // путь к твоему DataSource
import { User } from './entity/User'; // путь к твоей сущности

export async function blockUser(id: number) {
    const userRepository = AppDataSource.getRepository(User);

    // 1. Найти пользователя
    const user = await userRepository.findOneBy({ id: id });

    if (!user) {
        console.log('Пользователь не найден');
        return;
    }
    console.log("point");
    console.log(user);

    // 2. Изменить поля
    user.is_active = false;

    // 3. Сохранить в БД
    await userRepository.save(user);

    console.log('Пользователь заблокирован');
}