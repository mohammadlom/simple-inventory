import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'iamge_path', type: 'text' })
    imagePath: string;
}