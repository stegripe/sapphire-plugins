import type { Args, CommandOptions as SapphireCommandOptions } from "@sapphire/framework";
import { Command, RegisterBehavior } from "@sapphire/framework";
import type { Awaitable } from "@sapphire/utilities";
import { cast } from "@sapphire/utilities";
import type {
    ChatInputApplicationCommandData,
    ChatInputCommandInteraction,
    ContextMenuCommandBuilder,
    Message,
    MessageApplicationCommandData,
    SlashCommandBuilder,
    UserApplicationCommandData,
    UserContextMenuCommandInteraction
} from "discord.js";
import { MessageContextMenuCommandInteraction } from "discord.js";
import { ChatInputCommandInteractionContext } from "./structures/ChatInputCommandInteractionContext.js";
import type { CommandContext } from "./structures/CommandContext.js";
import { MessageContext } from "./structures/MessageContext.js";
import { MessageContextMenuCommandInteractionContext } from "./structures/MessageContextMenuCommandInteractionContext.js";
import { UserContextMenuCommandInteractionContext } from "./structures/UserContextMenuCommandInteractionContext.js";

export abstract class ContextCommand extends Command {
    public constructor(
        context: Command.LoaderContext,
        options?: SapphireCommandOptions | undefined
    ) {
        super(context, options);
        const registry = this.applicationCommandRegistry;

        if (this.options.chatInput) {
            const chatInput = cast<ChatInputApplicationCommandData>(this.options.chatInput());
            registry.registerChatInputCommand(chatInput, {
                behaviorWhenNotIdentical: RegisterBehavior.Overwrite
            });
        }

        if (this.options.contextMenu) {
            const contextMenu = cast<MessageApplicationCommandData | UserApplicationCommandData>(
                this.options.contextMenu()
            );
            registry.registerContextMenuCommand(contextMenu, {
                behaviorWhenNotIdentical: RegisterBehavior.Overwrite
            });
        }
    }

    public override messageRun(message: Message, args: Args): Awaitable<unknown> {
        return this.contextRun(new MessageContext(message, args));
    }

    public override chatInputRun(interaction: ChatInputCommandInteraction): Awaitable<unknown> {
        return this.contextRun(new ChatInputCommandInteractionContext(interaction));
    }

    public override contextMenuRun(
        interaction: MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction
    ): Awaitable<unknown> {
        return this.contextRun(
            interaction instanceof MessageContextMenuCommandInteraction
                ? new MessageContextMenuCommandInteractionContext(interaction)
                : new UserContextMenuCommandInteractionContext(interaction)
        );
    }

    public abstract contextRun(ctx: CommandContext): Awaitable<unknown>;
}

declare module "@sapphire/framework" {
    interface CommandOptions {
        chatInput?(): SlashCommandBuilder;
        contextMenu?(): ContextMenuCommandBuilder;
    }
}
