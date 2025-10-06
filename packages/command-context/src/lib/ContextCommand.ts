import { type Args, Command, RegisterBehavior } from "@sapphire/framework";
import { type Awaitable } from "@sapphire/utilities";
import {
    type ChatInputCommandInteraction,
    type ContextMenuCommandBuilder,
    type ContextMenuCommandInteraction,
    type Message,
    type SlashCommandBuilder,
} from "discord.js";
import { ChatInputCommandInteractionContext } from "./structures/ChatInputCommandInteractionContext.js";
import { type CommandContext } from "./structures/CommandContext.js";
import { MessageContext } from "./structures/MessageContext.js";
import { MessageContextMenuCommandInteractionContext } from "./structures/MessageContextMenuCommandInteractionContext.js";
import { UserContextMenuCommandInteractionContext } from "./structures/UserContextMenuCommandInteractionContext.js";

export abstract class ContextCommand extends Command {
    public chatInputCommand?: SlashCommandBuilder;
    public contextMenuCommand?: ContextMenuCommandBuilder;

    public constructor(context: Command.LoaderContext, options?: Command.Options) {
        super(context, options);

        const registry = this.applicationCommandRegistry;

        if (this.options.chatInputCommand) {
            registry.registerChatInputCommand(
                (builder) => {
                    this.chatInputCommand = this.options.chatInputCommand!(builder, this.options);
                    return this.chatInputCommand;
                },
                {
                    behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
                },
            );
        }

        if (this.options.contextMenuCommand) {
            registry.registerContextMenuCommand(
                (builder) => {
                    this.contextMenuCommand = this.options.contextMenuCommand!(
                        builder,
                        this.options,
                    );
                    return this.contextMenuCommand;
                },
                {
                    behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
                },
            );
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
        }

        if (interaction.isUserContextMenuCommand()) {
            return this.contextRun(new UserContextMenuCommandInteractionContext(interaction));
        }

        return undefined;
    }

    public abstract contextRun(ctx: CommandContext): Awaitable<unknown>;
}

declare module "@sapphire/framework" {
    interface CommandOptions {
        chatInputCommand?(
            builder: SlashCommandBuilder,
            options: Command.Options,
        ): SlashCommandBuilder;
        contextMenuCommand?(
            builder: ContextMenuCommandBuilder,
            options: Command.Options,
        ): ContextMenuCommandBuilder;
    }
}
