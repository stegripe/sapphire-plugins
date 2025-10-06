import { cast } from "@sapphire/utilities";
import {
    ChatInputCommandInteraction,
    CommandInteraction,
    type Interaction,
    Message,
    MessageContextMenuCommandInteraction,
    MessagePayload,
    type MessagePayloadOption,
    type PartialGroupDMChannel,
    type TextBasedChannel,
    UserContextMenuCommandInteraction,
} from "discord.js";
import { type ChatInputCommandInteractionContext } from "./ChatInputCommandInteractionContext.js";
import { type CommandInteractionContext } from "./CommandInteractionContext.js";
import { type MessageContext } from "./MessageContext.js";
import { type MessageContextMenuCommandInteractionContext } from "./MessageContextMenuCommandInteractionContext.js";
import { type UserContextMenuCommandInteractionContext } from "./UserContextMenuCommandInteractionContext.js";

export class CommandContext {
    public constructor(public readonly context: CommandInteraction | Message) {}

    public get applicationId() {
        return this.context.applicationId;
    }

    public get author() {
        return this.context instanceof CommandInteraction ? this.context.user : this.context.author;
    }

    public get channel() {
        return this.context.channel;
    }

    public get channelId() {
        return this.context.channelId;
    }

    public get client() {
        return this.context.client;
    }

    public get createdAt() {
        return this.context.createdAt;
    }

    public get createdTimestamp() {
        return this.context.createdTimestamp;
    }

    public get guild() {
        return this.context.guild;
    }

    public get guildId() {
        return this.context.guildId;
    }

    public get id() {
        return this.context.id;
    }

    public get member() {
        return this.context.member;
    }

    public get type() {
        return this.context.type;
    }

    public inGuild() {
        return this.context.inGuild();
    }

    public toJSON(...props: Record<string, boolean | string>[]) {
        return this.context.toJSON(...props);
    }

    public toString() {
        return this.context.toString();
    }

    public valueOf() {
        return this.context.valueOf();
    }

    public isMessageContext(): this is MessageContext {
        return this.context instanceof Message;
    }

    public isCommandInteraction(): this is CommandInteractionContext {
        return this.context instanceof CommandInteraction;
    }

    public isChatInputInteractionContext(): this is ChatInputCommandInteractionContext {
        return this.context instanceof ChatInputCommandInteraction;
    }

    public isUserContextMenuInteractionContext(): this is UserContextMenuCommandInteractionContext {
        return this.context instanceof UserContextMenuCommandInteraction;
    }

    public isMessageContextMenuInteractionContext(): this is MessageContextMenuCommandInteractionContext {
        return this.context instanceof MessageContextMenuCommandInteraction;
    }

    public send(options: MessagePayloadOption | string) {
        const messagePayload = new MessagePayload(
            cast<Interaction | Message>(this.context),
            typeof options === "string" ? { content: options } : options,
        );

        if (this.isCommandInteraction()) {
            if (this.deferred && !this.replied) {
                return this.editReply(messagePayload);
            }

            if (this.replied) {
                return this.editReply(messagePayload);
            }

            return cast<Promise<Message>>(this.context.reply(messagePayload));
        }

        return cast<Exclude<TextBasedChannel, PartialGroupDMChannel>>(this.channel)?.send(
            messagePayload,
        );
    }

    public reply(options: MessagePayloadOption | string) {
        if (this.isCommandInteraction()) {
            return this.send(options);
        }

        const messagePayload = new MessagePayload(
            cast<Interaction | Message>(this.context),
            typeof options === "string"
                ? {
                      content: options,
                      reply: {
                          messageReference: this.id,
                          failIfNotExists: false,
                      },
                  }
                : {
                      ...options,
                      reply: {
                          messageReference: this.id,
                          failIfNotExists: false,
                      },
                  },
        );
        return cast<Message>(this.context).reply(messagePayload);
    }
}
