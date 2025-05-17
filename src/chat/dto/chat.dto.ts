import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChatDto {
    @ApiProperty({
        description: "The user's query or message to process",
        example: "I am looking for a phone",
    })
    @IsString({ message: "Query must be a string" })
    query: string;
}
