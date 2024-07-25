import type { Args } from "@sapphire/framework";
import type {
    ActionRow,
    AnyThreadChannel,
    Attachment,
    AwaitMessageCollectorOptionsParams,
    AwaitReactionsOptions,
    ClientApplication,
    Collection,
    CommandInteractionResolvedData,
    Embed,
    EmojiIdentifierResolvable,
    InteractionCollector,
    MappedInteractionTypes,
    Message,
    MessageActionRowComponent,
    MessageActivity,
    MessageCollectorOptionsParams,
    MessageComponentType,
    MessageEditOptions,
    MessageFlagsBitField,
    MessageInteraction,
    MessageMentions,
    MessagePayload,
    MessageReaction,
    MessageReference,
    Poll,
    ReactionCollector,
    ReactionCollectorOptions,
    ReactionManager,
    RoleSubscriptionData,
    Snowflake,
    StartThreadOptions,
    Sticker,
    Webhook
} from "discord.js";
import { CommandContext } from "./CommandContext.js";

export class MessageContext extends CommandContext {
    public constructor(
        public override readonly context: Message,
        public readonly args?: Args
    ) {
        super(context);
    }

    public get activity(): MessageActivity | null {
        return this.context.activity;
    }

    public get attachments(): Collection<string, Attachment> {
        return this.context.attachments;
    }

    public get bulkDeletable(): boolean {
        throw new Error("Method not implemented.");
    }

    public get cleanContent(): string {
        throw new Error("Method not implemented.");
    }

    public get components(): ActionRow<MessageActionRowComponent>[] {
        return this.context.components;
    }

    public get content(): string {
        return this.context.content;
    }

    public get crosspostable(): boolean {
        throw new Error("Method not implemented.");
    }

    public get deletable(): boolean {
        throw new Error("Method not implemented.");
    }

    public get editable(): boolean {
        throw new Error("Method not implemented.");
    }

    public get editedAt(): Date | null {
        throw new Error("Method not implemented.");
    }

    public get editedTimestamp(): number | null {
        return this.context.editedTimestamp;
    }

    public get embeds(): Embed[] {
        return this.context.embeds;
    }

    public get groupActivityApplication(): ClientApplication | null {
        return this.context.groupActivityApplication;
    }

    public get hasThread(): boolean {
        throw new Error("Method not implemented.");
    }

    public get interaction(): MessageInteraction | null {
        return this.context.interaction;
    }

    public get mentions(): MessageMentions {
        return this.context.mentions;
    }

    public get nonce(): number | string | null {
        return this.context.nonce;
    }

    public get partial(): false {
        throw new Error("Method not implemented.");
    }

    public get pinnable(): boolean {
        throw new Error("Method not implemented.");
    }

    public get pinned(): boolean {
        return this.context.pinned;
    }

    public get reactions(): ReactionManager {
        return this.context.reactions;
    }

    public get stickers(): Collection<string, Sticker> {
        return this.context.stickers;
    }

    public get position(): number | null {
        return this.context.position;
    }

    public get roleSubscriptionData(): RoleSubscriptionData | null {
        return this.context.roleSubscriptionData;
    }

    public get resolved(): CommandInteractionResolvedData | null {
        return this.context.resolved;
    }

    public get system(): boolean {
        return this.context.system;
    }

    public get thread(): AnyThreadChannel | null {
        throw new Error("Method not implemented.");
    }

    public get tts(): boolean {
        return this.context.tts;
    }

    public get poll(): Poll | null {
        return this.context.poll;
    }

    public get url(): string {
        throw new Error("Method not implemented.");
    }

    public get webhookId(): string | null {
        return this.context.webhookId;
    }

    public get flags(): Readonly<MessageFlagsBitField> {
        return this.context.flags;
    }

    public get reference(): MessageReference | null {
        return this.context.reference;
    }

    public async awaitMessageComponent<ComponentType extends MessageComponentType>(
        options?: AwaitMessageCollectorOptionsParams<ComponentType> | undefined
    ): Promise<MappedInteractionTypes[ComponentType]> {
        return this.context.awaitMessageComponent(options);
    }

    public async awaitReactions(
        options?: AwaitReactionsOptions
    ): Promise<Collection<Snowflake, MessageReaction>> {
        return this.context.awaitReactions(options);
    }

    public createReactionCollector(options?: ReactionCollectorOptions): ReactionCollector {
        return this.context.createReactionCollector(options);
    }

    public createMessageComponentCollector<ComponentType extends MessageComponentType>(
        options?: MessageCollectorOptionsParams<ComponentType> | undefined
    ): InteractionCollector<MappedInteractionTypes[ComponentType]> {
        return this.context.createMessageComponentCollector(options);
    }

    public async delete(): Promise<Message> {
        return this.context.delete();
    }

    public async edit(content: MessageEditOptions | MessagePayload | string): Promise<Message> {
        return this.context.edit(content);
    }

    public equals(message: Message, rawData: unknown): boolean {
        return this.context.equals(message, rawData);
    }

    public async fetchReference(): Promise<Message> {
        return this.context.fetchReference();
    }

    public async fetchWebhook(): Promise<Webhook> {
        return this.context.fetchWebhook();
    }

    public async crosspost(): Promise<Message> {
        return this.context.crosspost();
    }

    public async fetch(force?: boolean): Promise<Message> {
        return this.context.fetch(force);
    }

    public async pin(reason?: string): Promise<Message> {
        return this.context.pin(reason);
    }

    public async react(emoji: EmojiIdentifierResolvable): Promise<MessageReaction> {
        return this.context.react(emoji);
    }

    public async removeAttachments(): Promise<Message> {
        return this.context.removeAttachments();
    }

    public resolveComponent(customId: string): MessageActionRowComponent | null {
        return this.context.resolveComponent(customId);
    }

    public async startThread(options: StartThreadOptions): Promise<AnyThreadChannel> {
        return this.context.startThread(options);
    }

    public async suppressEmbeds(suppress?: boolean): Promise<Message> {
        return this.context.suppressEmbeds(suppress);
    }

    public async unpin(reason?: string): Promise<Message> {
        return this.context.unpin(reason);
    }
}
