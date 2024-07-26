<div align="center">

<img src="https://cdn.stegripe.org/images/icon.png" alt="Stegripe Logo" width="256" height="256" />

# @stegripe/command-context

**Plugin for [**`@sapphire/framework`**](https://github.com/sapphire/framework) used to handle Message & Interaction Command in a single context.**

[![GitHub](https://img.shields.io/github/license/stegripe/packages)](https://github.com/stegripe/packages/blob/main/LICENSE.md)

</div>

## Description

This plugin is used to handle Message & Interaction Command in a single context. It is used to simplify the process of creating commands that can be used in both Message and Interaction contexts.

## Features

-   Easy to use
-   Support for preconditions.
-   Based on command class.

## Installation

`@stegripe/command-context` depends on the following packages. Be sure to install these along with this package!

-   [`discord.js`](https://npmjs.com/package/discord.js)
-   [`@sapphire/framework`](https://npmjs.com/package/@sapphire/framework)
-   [`@sapphire/utilities`](https://npmjs.com/package/@sapphire/utilities)

You can use the following command to install this package, or replace `pnpm install` with your package manager of choice.

```sh
pnpm install @stegripe/command-context
```

## Usage

### Without Decorators

```ts
import { Command } from "@sapphire/framework";
import { CommandContext, ContextCommand } from "@stegripe/command-context";
import { ApplicationCommandType, ContextMenuCommandBuilder, SlashCommandBuilder } from "discord.js";

export class MyCommand extends ContextCommand {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: "my-command",
            description: "This is my command!",
            chatInputCommand() {
                return new SlashCommandBuilder()
                    .setName(this.name!)
                    .setDescription(this.description!);
            },
            contextMenuCommand() {
                return new ContextMenuCommandBuilder()
                    .setName(this.name!)
                    .setType(ApplicationCommandType.Message);
            }
        });
    }

    public async contextRun(ctx: CommandContext): Promise<void> {
        if (ctx.isCommandInteraction() && !ctx.deferred) await ctx.deferReply();

        await ctx.reply("Hello, World!");
    }
}
```

### With Decorators

```ts
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { CommandContext, ContextCommand } from "@stegripe/command-context";
import { SlashCommandBuilder } from "discord.js";

@ApplyOptions<Command.Options>({
    name: "my-command",
    description: "This is my command!",
    chatInputCommand() {
        return new SlashCommandBuilder().setName(this.name!).setDescription(this.description!);
    },
    contextMenuCommand() {
        return new ContextMenuCommandBuilder()
            .setName(this.name!)
            .setType(ApplicationCommandType.Message);
    }
})
export class MyCommand extends ContextCommand {
    public async contextRun(ctx: CommandContext): Promise<void> {
        if (ctx.isCommandInteraction() && !ctx.deferred) await ctx.deferReply();

        await ctx.reply("Hello, World!");
    }
}
```
