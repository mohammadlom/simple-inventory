import { IsNumberString, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    name: string;

    @IsNumberString()
    price: number;
}