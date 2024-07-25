import type {
    APIInteractionGuildMember,
    GuildMember,
    User,
    UserContextMenuCommandInteraction
} from "discord.js";
import { CommandInteractionContext } from "./CommandInteractionContext.js";

export class UserContextMenuCommandInteractionContext extends CommandInteractionContext {
    public constructor(public override readonly context: UserContextMenuCommandInteraction) {
        super(context);
    }
    public get targetUser(): User {
        return this.context.targetUser;
    }

    public get targetMember(): APIInteractionGuildMember | GuildMember | null {
        return this.context.targetMember;
    }

    public get targetId(): string {
        return this.context.targetId;
    }
}
