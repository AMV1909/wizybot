import { Injectable } from "@nestjs/common";
import { OpenAI } from "openai";

import { env } from "../config/envConfig";
import { searchProducts } from "./functions/search-products.function";
import { convertCurrencies } from "./functions/convert-currencies.function";
import { parseToJSON } from "../common/helpers/parseToJSON";

/**
 * ChatService handles the core functionality of processing user queries
 * and interacting with OpenAI's API to provide intelligent responses.
 * It supports two main functions:
 * 1. Product search
 * 2. Currency conversion
 */
@Injectable()
export class ChatService {
    private openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

    /**
     * Processes a user query and returns an AI-generated response
     * The method:
     * 1. Defines available tools (functions) for the AI
     * 2. Gets initial AI response with potential function calls
     * 3. Executes any requested functions
     * 4. Gets final AI response incorporating function results
     *
     * @param query - The user's input query
     * @returns Promise<string> - The AI's final response
     */
    async handleUserQuery(query: string) {
        // Define available tools for the AI
        const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
            {
                type: "function",
                function: {
                    name: "searchProducts",
                    description: "Search for 2 relevant products",
                    parameters: {
                        type: "object",
                        properties: {
                            query: { type: "string" },
                        },
                        required: ["query"],
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "convertCurrencies",
                    description: "Convert currency from one to another",
                    parameters: {
                        type: "object",
                        properties: {
                            amount: { type: "number" },
                            from: { type: "string" },
                            to: { type: "string" },
                        },
                        required: ["amount", "from", "to"],
                    },
                },
            },
        ];

        // Get initial AI response with potential function calls
        const initialResponse = await this.openai.chat.completions.create({
            model: env.OPENAI_MODEL,
            messages: [{ role: "user", content: query }],
            tools,
            tool_choice: "auto"
        });

        const message = initialResponse.choices[0].message;
        const toolCalls = message.tool_calls;

        // If no functions were called, return the message content
        if (!toolCalls || toolCalls.length === 0) {
            return message.content || "I couldn't find any relevant information.";
        }

        // Process each function call and collect responses
        const toolResponses: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
            [];

        for (const toolCall of toolCalls) {
            if (toolCall.type === "function") {
                const { name, arguments: args } = toolCall.function;

                let result: unknown;

                // Execute the appropriate function based on the name
                if (name === "searchProducts") {
                    const parsedArgs = parseToJSON<{ query: string }>(args);
                    result = await searchProducts(parsedArgs.query);
                } else if (name === "convertCurrencies") {
                    const parsedArgs = parseToJSON<{
                        amount: number;
                        from: string;
                        to: string;
                    }>(args);

                    result = await convertCurrencies(parsedArgs);
                } else {
                    result = `Function ${name} not implemented.`;
                }

                // Add function result to responses
                toolResponses.push({
                    role: "tool",
                    content: JSON.stringify(result),
                    tool_call_id: toolCall.id,
                });
            }
        }

        // Get final AI response incorporating function results
        const finalResponse = await this.openai.chat.completions.create({
            model: env.OPENAI_MODEL,
            messages: [
                { role: "user", content: query },
                message,
                ...toolResponses,
            ],
        });

        return finalResponse.choices[0].message.content;
    }
}
