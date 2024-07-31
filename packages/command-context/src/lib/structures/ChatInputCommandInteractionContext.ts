/* eslint-disable typescript/explicit-module-boundary-types */
/* eslint-disable typescript/explicit-function-return-type */
import type { ChatInputCommandInteraction } from "discord.js";
import { CommandInteractionContext } from "./CommandInteractionContext.js";

export class ChatInputCommandInteractionContext extends CommandInteractionContext {
    public constructor(public override readonly context: ChatInputCommandInteraction) {
        super(context);
    }

    public override get commandType() {
        return this.context.commandType;
    }

    public override get options() {
        return this.context.options;
    }
}
