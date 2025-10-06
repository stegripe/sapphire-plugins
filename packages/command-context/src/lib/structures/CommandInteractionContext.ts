import {
    type AnySelectMenuInteraction,
    type APIModalInteractionResponseCallbackData,
    type AutocompleteInteraction,
    type AwaitModalSubmitOptions,
    type BooleanCache,
    type ButtonInteraction,
    type CacheType,
    type ChannelSelectMenuInteraction,
    type ChatInputCommandInteraction,
    type CommandInteraction,
    type ContextMenuCommandInteraction,
    type InteractionDeferReplyOptions,
    type InteractionEditReplyOptions,
    type InteractionReplyOptions,
    type InteractionResponse,
    type JSONEncodable,
    type MentionableSelectMenuInteraction,
    type Message,
    type MessageComponentInteraction,
    type MessageContextMenuCommandInteraction,
    type MessagePayload,
    type MessageResolvable,
    type ModalComponentData,
    type ModalSubmitInteraction,
    type RepliableInteraction,
    type RoleSelectMenuInteraction,
    type Snowflake,
    type StringSelectMenuInteraction,
    type UserContextMenuCommandInteraction,
    type UserSelectMenuInteraction,
} from "discord.js";
import { CommandContext } from "./CommandContext.js";

export class CommandInteractionContext extends CommandContext {
    public constructor(public override readonly context: CommandInteraction) {
        super(context);
    }

    public get deferred() {
        return this.context.deferred;
    }

    public get command() {
        return this.context.command;
    }

    public get options() {
        if (
            this.context.isChatInputCommand() ||
            this.context.isMessageContextMenuCommand() ||
            this.context.isUserContextMenuCommand()
        ) {
            return this.context.options;
        }

        return null;
    }

    public get commandId() {
        return this.context.commandId;
    }

    public get commandName() {
        return this.context.commandName;
    }

    public get commandType() {
        return this.context.commandType;
    }

    public get commandGuildId() {
        return this.context.commandGuildId;
    }

    public get ephemeral() {
        return this.context.ephemeral;
    }

    public get replied() {
        return this.context.replied;
    }

    public get webhook() {
        return this.context.webhook;
    }

    public get token() {
        return this.context.token;
    }

    public get user() {
        return this.context.user;
    }

    public get version() {
        return this.context.version;
    }

    public get appPermissions() {
        return this.context.appPermissions;
    }

    public get memberPermissions() {
        return this.context.memberPermissions;
    }

    public get locale() {
        return this.context.locale;
    }

    public get guildLocale() {
        return this.context.guildLocale;
    }

    public get entitlements() {
        return this.context.entitlements;
    }

    public inCachedGuild(): this is CommandInteraction<"cached"> {
        return this.context.inCachedGuild();
    }

    public inRawGuild(): this is CommandInteraction<"raw"> {
        return this.context.inRawGuild();
    }

    public deferReply(
        options: InteractionDeferReplyOptions,
    ): Promise<Message<BooleanCache<CacheType>>>;

    public deferReply(
        options?: InteractionDeferReplyOptions,
    ): Promise<InteractionResponse<BooleanCache<CacheType>>>;

    public deferReply(
        options?: InteractionDeferReplyOptions | undefined,
    ): Promise<InteractionResponse<BooleanCache<CacheType>> | Message<BooleanCache<CacheType>>> {
        return this.context.deferReply(options);
    }

    public deleteReply(message?: MessageResolvable) {
        return this.context.deleteReply(message);
    }

    public editReply(
        options: InteractionEditReplyOptions | MessagePayload | string,
    ): Promise<Message<BooleanCache<CacheType>>> {
        return this.context.editReply(options);
    }

    public fetchReply(message?: Snowflake): Promise<Message<BooleanCache<CacheType>>> {
        return this.context.fetchReply(message);
    }

    public followUp(
        options: InteractionReplyOptions | MessagePayload | string,
    ): Promise<Message<BooleanCache<CacheType>>> {
        return this.context.followUp(options);
    }

    public showModal(
        modal:
            | APIModalInteractionResponseCallbackData
            | JSONEncodable<APIModalInteractionResponseCallbackData>
            | ModalComponentData,
    ) {
        return this.context.showModal(modal);
    }

    public sendPremiumRequired(): Promise<void> {
        return this.context.sendPremiumRequired();
    }

    public awaitModalSubmit(
        options: AwaitModalSubmitOptions<ModalSubmitInteraction>,
    ): Promise<ModalSubmitInteraction> {
        return this.context.awaitModalSubmit(options);
    }

    public isButton(): this is ButtonInteraction {
        return this.context.isButton();
    }

    public isAutocomplete(): this is AutocompleteInteraction {
        return this.context.isAutocomplete();
    }

    public isChatInputCommand(): this is ChatInputCommandInteraction {
        return this.context.isChatInputCommand();
    }

    public isCommand(): this is CommandInteraction {
        return this.context.isCommand();
    }

    public isContextMenuCommand(): this is ContextMenuCommandInteraction {
        return this.context.isContextMenuCommand();
    }

    public isMessageComponent(): this is MessageComponentInteraction {
        return this.context.isMessageComponent();
    }

    public isMessageContextMenuCommand(): this is MessageContextMenuCommandInteraction {
        return this.context.isMessageContextMenuCommand();
    }

    public isModalSubmit(): this is ModalSubmitInteraction {
        return this.context.isModalSubmit();
    }

    public isUserContextMenuCommand(): this is UserContextMenuCommandInteraction {
        return this.context.isUserContextMenuCommand();
    }

    public isSelectMenu(): this is StringSelectMenuInteraction {
        return this.context.isSelectMenu();
    }

    public isAnySelectMenu(): this is AnySelectMenuInteraction {
        return this.context.isAnySelectMenu();
    }

    public isStringSelectMenu(): this is StringSelectMenuInteraction {
        return this.context.isStringSelectMenu();
    }

    public isUserSelectMenu(): this is UserSelectMenuInteraction {
        return this.context.isUserSelectMenu();
    }

    public isRoleSelectMenu(): this is RoleSelectMenuInteraction {
        return this.context.isRoleSelectMenu();
    }

    public isMentionableSelectMenu(): this is MentionableSelectMenuInteraction {
        return this.context.isMentionableSelectMenu();
    }

    public isChannelSelectMenu(): this is ChannelSelectMenuInteraction {
        return this.context.isChannelSelectMenu();
    }

    public isRepliable(): this is RepliableInteraction {
        return this.context.isRepliable();
    }
}
