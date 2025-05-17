import { ApiProperty } from "@nestjs/swagger";

export class ChatResponseSchema {
    @ApiProperty({
        description: "The AI-generated response to the user's query",
        example: "I found some phones that match your criteria...",
    })
    content: string;
}

export const chatResponseExample = {
    content: "I found some phones that match your criteria...",
};
