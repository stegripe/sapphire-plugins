import { type Awaitable, Events } from "@sapphire/framework";
import { ContextCommand } from "./ContextCommand";
import { type CommandContext } from "./structures/CommandContext";

export abstract class SubCommand extends ContextCommand {
    public contextRun(ctx: CommandContext): Awaitable<unknown> {
        if (!(this.options.onlyInteraction ?? false) && ctx.isMessageContext()) {
            const nextCommand = ctx.args?.next();

            if (typeof nextCommand === "string" && Reflect.has(this, nextCommand)) {
                const subCommand = Reflect.get(this, nextCommand);
                if (typeof subCommand === "function") {
                    return subCommand.call(this, ctx);
                }
            }

            if (
                typeof nextCommand === "string" &&
                (this.store.get(nextCommand)?.options.isGroupChildren ?? false)
            ) {
                const command = this.store.get(nextCommand)!;
                const prefix = this.container.client.fetchPrefix(ctx.context);

                this.container.client.emit(Events.PreMessageCommandRun.toString(), {
                    message: ctx.context,
                    command,
                    parameters: ctx.content.split(nextCommand).at(1) ?? "",
                    context: {
                        commandName: command.name,
                        commandPrefix: prefix,
                        prefix,
                    },
                });

                return undefined;
            }

            const unknownSubcommand = Reflect.get(this, "unknown");
            if (typeof unknownSubcommand === "function") {
                return unknownSubcommand.call(this, ctx);
            }
        }

        if (!ctx.isChatInputInteractionContext()) {
            return undefined;
        }

        const getSubcommand = ctx.options.getSubcommand(false);
        const getSubcommandGroup = ctx.options.getSubcommandGroup(false);

        if (typeof getSubcommand === "string" && Reflect.has(this, getSubcommand)) {
            const subCommand = Reflect.get(this, getSubcommand);
            if (typeof subCommand === "function") {
                return subCommand.call(this, ctx);
            }
        }

        if (this.store.has(getSubcommand ?? "") || this.store.has(getSubcommandGroup ?? "")) {
            const subCommand =
                this.store.get(`${ctx.commandName}-${getSubcommandGroup ?? getSubcommand!}`) ??
                this.store.get(getSubcommandGroup ?? getSubcommand!);

            if (subCommand) {
                this.container.client.emit(Events.PreChatInputCommandRun.toString(), {
                    interaction: ctx.context,
                    command: subCommand,
                    context: {
                        commandId: ctx.context.id,
                        commandName: getSubcommand ?? getSubcommandGroup,
                    },
                });

                return undefined;
            }
        }

        if (getSubcommand !== null) {
            this.container.logger.error(`Can't find Subcommand: ${getSubcommand}`);
        }

        return undefined;
    }
}

declare module "@sapphire/framework" {
    interface CommandOptions {
        isGroupChildren?: boolean;
        onlyInteraction?: boolean;
    }
}
