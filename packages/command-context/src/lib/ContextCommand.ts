import type { Args } from "@sapphire/framework";
import { Command, RegisterBehavior } from "@sapphire/framework";
import type { Awaitable } from "@sapphire/utilities";
import type {
    ChatInputCommandInteraction,
    ContextMenuCommandBuilder,
    ContextMenuCommandInteraction,
    Message,
    SlashCommandBuilder
} from "discord.js";
import { ChatInputCommandInteractionContext } from "./structures/ChatInputCommandInteractionContext.js";
import type { CommandContext } from "./structures/CommandContext.js";
import { MessageContext } from "./structures/MessageContext.js";
import { MessageContextMenuCommandInteractionContext } from "./structures/MessageContextMenuCommandInteractionContext.js";
import { UserContextMenuCommandInteractionContext } from "./structures/UserContextMenuCommandInteractionContext.js";

export abstract class ContextCommand<
    PreParseReturn extends Args = Args,
    Options extends Command.Options = Command.Options
> extends Command<PreParseReturn, Options> {
    public readonly chatInputCommand?: SlashCommandBuilder;
    public readonly contextMenuCommand?: ContextMenuCommandBuilder;

    public constructor(context: Command.LoaderContext, options?: Options) {
        super(context, options);

        this.chatInputCommand = this.options.chatInputCommand?.(this.options);
        this.contextMenuCommand = this.options.contextMenuCommand?.(this.options);

        const registry = this.applicationCommandRegistry;

        if (this.chatInputCommand) {
            registry.registerChatInputCommand(this.chatInputCommand, {
                behaviorWhenNotIdentical: RegisterBehavior.Overwrite
            });
        }

        if (this.contextMenuCommand) {
            registry.registerContextMenuCommand(this.contextMenuCommand, {
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

    public override contextMenuRun(interaction: ContextMenuCommandInteraction): Awaitable<unknown> {
        if (interaction.isMessageContextMenuCommand()) {
            return this.contextRun(new MessageContextMenuCommandInteractionContext(interaction));
        } else if (interaction.isUserContextMenuCommand()) {
            return this.contextRun(new UserContextMenuCommandInteractionContext(interaction));
        }

        return undefined;
    }

    public abstract contextRun(ctx: CommandContext): Awaitable<unknown>;
}

declare module "@sapphire/framework" {
    interface CommandOptions {
        chatInputCommand?(options: Command.Options): SlashCommandBuilder;
        contextMenuCommand?(options: Command.Options): ContextMenuCommandBuilder;
    }
}
