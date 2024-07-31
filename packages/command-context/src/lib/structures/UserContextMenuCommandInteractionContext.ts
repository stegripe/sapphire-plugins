/* eslint-disable typescript/explicit-module-boundary-types */
/* eslint-disable typescript/explicit-function-return-type */
import type { UserContextMenuCommandInteraction } from "discord.js";
import { CommandInteractionContext } from "./CommandInteractionContext.js";

export class UserContextMenuCommandInteractionContext extends CommandInteractionContext {
    public constructor(public override readonly context: UserContextMenuCommandInteraction) {
        super(context);
    }

    public override get commandType() {
        return this.context.commandType;
    }

    public override get options() {
        return this.context.options;
    }

    public get targetId() {
        return this.context.targetId;
    }

    public get targetMember() {
        return this.context.targetMember;
    }

    public get targetUser() {
        return this.context.targetUser;
    }
}
