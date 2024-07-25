import type { Message, MessageContextMenuCommandInteraction } from "discord.js";
import { CommandInteractionContext } from "./CommandInteractionContext.js";

export class MessageContextMenuCommandInteractionContext extends CommandInteractionContext {
    public constructor(public override readonly context: MessageContextMenuCommandInteraction) {
        super(context);
    }

    public get targetMessage(): Message {
        return this.context.targetMessage;
    }

    public get targetId(): string {
        return this.context.targetId;
    }
}
