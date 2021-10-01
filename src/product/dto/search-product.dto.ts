import { ApiProperty } from "@nestjs/swagger";

export class SearchProductDto {
    @ApiProperty({
        description: 'Part of product\'s name',
        example: 'Test'
    })
    name: string;
}