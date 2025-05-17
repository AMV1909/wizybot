import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import {
    ChatResponseSchema,
    chatResponseExample,
} from "../schemas/chat.schema";

export const ChatOperations = {
    processQuery: ApiOperation({
        summary: "Process a user query",
        description:
            "Handles user queries and returns AI-generated responses with potential product searches or currency conversions",
    }),

    responses: {
        success: ApiResponse({
            status: 200,
            description: "Successfully processed the query",
            type: ChatResponseSchema,
            content: {
                "application/json": {
                    example: chatResponseExample,
                },
            },
        }),
        badRequest: ApiResponse({
            status: 400,
            description: "Invalid input",
        }),
    },
};
