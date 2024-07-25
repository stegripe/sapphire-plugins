import type { ChatInputCommandInteraction } from "discord.js";
import { CommandInteractionContext } from "./CommandInteractionContext.js";

export class ChatInputCommandInteractionContext extends CommandInteractionContext {
    public constructor(public override readonly context: ChatInputCommandInteraction) {
        super(context);
    }
}
