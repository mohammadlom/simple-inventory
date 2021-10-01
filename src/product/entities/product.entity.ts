import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    AfterLoad,
} from "typeorm";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'image_path', type: 'text', nullable: true })
    imagePath: string;
}