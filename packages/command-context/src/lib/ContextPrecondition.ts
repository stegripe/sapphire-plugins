import { Precondition } from "@sapphire/framework";
import type {
    ChatInputCommandInteraction,
    Message,
    UserContextMenuCommandInteraction
} from "discord.js";
import { MessageContextMenuCommandInteraction } from "discord.js";
import { ChatInputCommandInteractionContext } from "./structures/ChatInputCommandInteractionContext.js";
import type { CommandContext } from "./structures/CommandContext.js";
import { MessageContext } from "./structures/MessageContext.js";
import { MessageContextMenuCommandInteractionContext } from "./structures/MessageContextMenuCommandInteractionContext.js";
import { UserContextMenuCommandInteractionContext } from "./structures/UserContextMenuCommandInteractionContext.js";

export abstract class ContextPrecondition extends Precondition {
    public constructor(context: Precondition.LoaderContext, options?: Precondition.Options) {
        super(context, options);
    }

    public override messageRun(message: Message): Precondition.Result {
        return this.contextRun(new MessageContext(message));
    }

    public override chatInputRun(interaction: ChatInputCommandInteraction): Precondition.Result {
        return this.contextRun(new ChatInputCommandInteractionContext(interaction));
    }

    public override contextMenuRun(
        interaction: MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction
    ): Precondition.Result {
        return this.contextRun(
            interaction instanceof MessageContextMenuCommandInteraction
                ? new MessageContextMenuCommandInteractionContext(interaction)
                : new UserContextMenuCommandInteractionContext(interaction)
        );
    }

    public abstract contextRun(ctx: CommandContext): Precondition.Result;
}
