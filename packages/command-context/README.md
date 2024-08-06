<div align="center">

<img src="https://cdn.stegripe.org/images/logo.png" alt="Stegripe Logo" width="135">

# @stegripe/command-context

**Plugin for [**`@sapphire/framework`**](https://github.com/sapphire/framework) used to handle Message & Interaction Command in a single context.**

[![GitHub](https://img.shields.io/github/license/stegripe/sapphire-plugins)](https://github.com/stegripe/sapphire-plugins/blob/main/LICENSE.md)
<a href="https://www.npmjs.com/package/@stegripe/command-context">
<img src="https://img.shields.io/npm/v/@stegripe/command-context?maxAge=3600" alt="npm version" ></a>
<img src="https://img.shields.io/npm/dt/@stegripe/command-context?maxAge=3600" alt="npm downloads">

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
```ts
import { Command } from "@sapphire/framework";
import { CommandContext, ContextCommand } from "@stegripe/command-context";
import { ApplicationCommandType, ContextMenuCommandBuilder, SlashCommandBuilder } from "discord.js";

export class MyCommand extends ContextCommand {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: "my-command",
            description: "This is my command.",
            chatInputCommand(builder) {
                return builder.setName(this.name).setDescription(this.description);
            },
            contextMenuCommand(builder) {
                return builder.setName(this.name).setType(ApplicationCommandType.Message);
            }
        });
    }

    public async contextRun(ctx: CommandContext): Promise<void> {
        if (ctx.isCommandInteraction() && !ctx.deferred) await ctx.deferReply();

        await ctx.reply("Hello, World!");
    }
}
```

## With Decorators
```ts
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { CommandContext, ContextCommand } from "@stegripe/command-context";
import { SlashCommandBuilder } from "discord.js";

@ApplyOptions<Command.Options>({
    name: "my-command",
    description: "This is my command.",
    chatInputCommand(builder, opts) {
        return builder.setName(opts.name).setDescription(opts.description);
    },
    contextMenuCommand(builder, opts) {
        return builder.setName(opts.name).setType(ApplicationCommandType.Message);
    }
})
export class MyCommand extends ContextCommand {
    public async contextRun(ctx: CommandContext): Promise<void> {
        if (ctx.isCommandInteraction() && !ctx.deferred) await ctx.deferReply();

        await ctx.reply("Hello, World!");
    }
}
```
