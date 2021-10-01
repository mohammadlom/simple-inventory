import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString, Matches } from "class-validator";

export class LoginDto {

    @IsString({
        message: 'Name is invalid'
    })
    @ApiProperty({
        description: 'Name of registered user',
        example: 'Mohammad Hossein'
    })
    name: string;

    @IsNumberString()
    @Matches(new RegExp(/(0)([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig), {
        message: 'Mobile number is Wrong'
    })
    @ApiProperty({
        description: 'Mobile number of registerd user',
        example: '09309998516'
    })
    mobile: string;

}