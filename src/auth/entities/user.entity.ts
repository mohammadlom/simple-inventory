import { ApiProperty } from "@nestjs/swagger";
import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty({
        description: 'id of user',
        example: 1
    })
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @ApiProperty({
        description: 'Name of user',
        example: 'Mohammad Hossein'
    })
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ApiProperty({
        description: 'Mobile number of user',
        example: '09309998516'
    })
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