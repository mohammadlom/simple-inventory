import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: 'Name of product',
        example: 'Test Product'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Price of product',
        example: 1000
    })
    @IsNumberString()
    price: number;
}