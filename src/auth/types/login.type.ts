import { ApiProperty } from "@nestjs/swagger";

export class LoginType {
    @ApiProperty({
        description: 'Access Token you must provide in authorization header',
    })
    access_token: string
}