import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    mobile: string;


    static async validateUser(name: string, mobile: string): Promise<any> {
        const user = await this.findOne({
            name,
            mobile
        });
        if (user) {
            return user;
        }
        return null;
    }

}