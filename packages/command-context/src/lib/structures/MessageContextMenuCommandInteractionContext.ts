/* eslint-disable typescript/explicit-module-boundary-types */
/* eslint-disable typescript/explicit-function-return-type */
import type { MessageContextMenuCommandInteraction } from "discord.js";
import { CommandInteractionContext } from "./CommandInteractionContext.js";

export class MessageContextMenuCommandInteractionContext extends CommandInteractionContext {
    public constructor(public override readonly context: MessageContextMenuCommandInteraction) {
        super(context);
    }

    public override get commandType() {
        return this.context.commandType;
    }

    public override get options() {
        return this.context.options;
    }

    public get targetId() {
        return this.context.targetId;
    }

    public get targetMessage() {
        return this.context.targetMessage;
    }
}
