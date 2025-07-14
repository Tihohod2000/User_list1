import { AppDataSource } from './data-source'; // путь к твоему DataSource
import { User } from './entity/User'; // путь к твоей сущности

export async function blockUser(id: number) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: id });

    if (!user) {
        console.log('Пользователь не найден');
        return;
    }

    user.is_active = false;

    await userRepository.save(user);

    console.log('Пользователь заблокирован');
}