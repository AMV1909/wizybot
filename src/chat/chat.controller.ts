import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiBody } from "@nestjs/swagger";

import { ChatService } from "./chat.service";
import { ChatDto } from "./dto/chat.dto";
import { ChatOperations } from "../common/swagger/operations/chat.operations";

@ApiTags("Chat")
@Controller("chat")
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    @ChatOperations.processQuery
    @ApiBody({ type: ChatDto })
    @ChatOperations.responses.success
    @ChatOperations.responses.badRequest
    async chat(@Body() body: ChatDto) {
        return this.chatService.handleUserQuery(body.query);
    }
}
