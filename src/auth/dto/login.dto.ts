import { IsNumberString, IsString, Matches } from "class-validator";

export class LoginDto {

    @IsString({
        message: 'Name is invalid'
    })
    name: string;

    @IsNumberString()
    @Matches(new RegExp(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig), {
        message: 'Mobile number is Wrong'
    })
    mobile: string;

}