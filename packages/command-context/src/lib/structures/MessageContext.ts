import { type Args } from "@sapphire/framework";
import {
    type AwaitMessageCollectorOptionsParams,
    type AwaitReactionsOptions,
    type Collection,
    type EmojiIdentifierResolvable,
    type MappedInteractionTypes,
    type Message,
    type MessageCollectorOptionsParams,
    type MessageComponentType,
    type MessageEditOptions,
    type MessagePayload,
    type MessageReaction,
    type ReactionCollectorOptions,
    type Snowflake,
    type StartThreadOptions,
} from "discord.js";
import { CommandContext } from "./CommandContext.js";

export class MessageContext extends CommandContext {
    public constructor(
        public override readonly context: Message,
        public readonly args?: Args,
    ) {
        super(context);
    }

    public get activity() {
        return this.context.activity;
    }

    public get attachments() {
        return this.context.attachments;
    }

    public get components() {
        return this.context.components;
    }

    public get content() {
        return this.context.content;
    }

    public get editedTimestamp() {
        return this.context.editedTimestamp;
    }

    public get embeds() {
        return this.context.embeds;
    }

    public get groupActivityApplication() {
        return this.context.groupActivityApplication;
    }

    public get interaction() {
        return this.context.interactionMetadata;
    }

    public get mentions() {
        return this.context.mentions;
    }

    public get nonce() {
        return this.context.nonce;
    }

    public get pinned() {
        return this.context.pinned;
    }

    public get reactions() {
        return this.context.reactions;
    }

    public get stickers() {
        return this.context.stickers;
    }

    public get position() {
        return this.context.position;
    }

    public get roleSubscriptionData() {
        return this.context.roleSubscriptionData;
    }

    public get resolved() {
        return this.context.resolved;
    }

    public get system() {
        return this.context.system;
    }

    public get tts() {
        return this.context.tts;
    }

    public get poll() {
        return this.context.poll;
    }

    public get webhookId() {
        return this.context.webhookId;
    }

    public get flags() {
        return this.context.flags;
    }

    public get reference() {
        return this.context.reference;
    }

    public awaitMessageComponent<ComponentType extends MessageComponentType>(
        options?: AwaitMessageCollectorOptionsParams<ComponentType> | undefined,
    ): Promise<MappedInteractionTypes[ComponentType]> {
        return this.context.awaitMessageComponent(options);
    }

    public awaitReactions(
        options?: AwaitReactionsOptions,
    ): Promise<Collection<Snowflake, MessageReaction>> {
        return this.context.awaitReactions(options);
    }

    public createReactionCollector(options?: ReactionCollectorOptions) {
        return this.context.createReactionCollector(options);
    }

    public createMessageComponentCollector<ComponentType extends MessageComponentType>(
        options?: MessageCollectorOptionsParams<ComponentType> | undefined,
    ) {
        return this.context.createMessageComponentCollector(options);
    }

    public delete() {
        return this.context.delete();
    }

    public edit(content: MessageEditOptions | MessagePayload | string) {
        return this.context.edit(content);
    }

    public equals(message: Message, rawData: unknown) {
        return this.context.equals(message, rawData);
    }

    public fetchReference() {
        return this.context.fetchReference();
    }

    public fetchWebhook() {
        return this.context.fetchWebhook();
    }

    public crosspost() {
        return this.context.crosspost();
    }

    public fetch(force?: boolean) {
        return this.context.fetch(force);
    }

    public pin(reason?: string) {
        return this.context.pin(reason);
    }

    public react(emoji: EmojiIdentifierResolvable) {
        return this.context.react(emoji);
    }

    public removeAttachments() {
        return this.context.removeAttachments();
    }

    public resolveComponent(customId: string) {
        return this.context.resolveComponent(customId);
    }

    public startThread(options: StartThreadOptions) {
        return this.context.startThread(options);
    }

    public suppressEmbeds(suppress?: boolean) {
        return this.context.suppressEmbeds(suppress);
    }

    public unpin(reason?: string) {
        return this.context.unpin(reason);
    }
}
