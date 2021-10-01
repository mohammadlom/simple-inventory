import { ApiProperty } from "@nestjs/swagger";
import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    AfterLoad,
} from "typeorm";

@Entity('products')
export class Product extends BaseEntity {
    @ApiProperty({
        description: 'id of product',
        example: 1
    })
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @ApiProperty({
        description: 'Name of product',
        example: 'Test Product'
    })
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ApiProperty({
        description: 'Image name of product',
        example: '1.jpg'
    })
    @Column({ name: 'image_path', type: 'text', nullable: true })
    imagePath: string;
}