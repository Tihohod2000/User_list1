import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({default: "user"})
    full_name!: string

    @Column({type: 'timestamp'})
    birth_date!: Date

    @Column()
    email!: string

    @Column()
    password!: string

    @Column({default: "user"})
    role!: string

    @Column({default: "false"})
    is_active!: boolean

}
