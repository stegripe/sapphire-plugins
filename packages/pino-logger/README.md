<div align="center">

<img src="https://cdn.stegripe.org/images/icon.png" alt="Stegripe Logo" width="256" height="256" />

# @stegripe/pino-logger

**Plugin for [**`@sapphire/framework`**](https://github.com/sapphire/framework) used to handle logging with Pino.**

[![GitHub](https://img.shields.io/github/license/stegripe/sapphire-plugins)](https://github.com/stegripe/sapphire-plugins/blob/main/LICENSE.md)

</div>

## Description

This plugin is used to create custom loggers with Pino.

## Features

-   Easy to use

## Installation

`@stegripe/pino-logger` depends on the following packages. Be sure to install these along with this package!

-   [`pino`](https://npmjs.com/package/pino)
-   [`discord.js`](https://npmjs.com/package/discord.js)
-   [`@sapphire/framework`](https://npmjs.com/package/@sapphire/framework)
-   [`@sapphire/utilities`](https://npmjs.com/package/@sapphire/utilities)

You can use the following command to install this package, or replace `pnpm install` with your package manager of choice.

```sh
pnpm install @stegripe/pino-logger
```

## Usage

```ts
import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { PinoLogger } from "@stegripe/pino-logger";

export class MyClient extends SapphireClient {
    public constructor(clientOptions: SapphireClientOptions) {
        super({
            ...clientOptions,
            logger: {
                instance: new PinoLogger({
                    name: "MyClient",
                    timestamp: true,
                    level: ISDEV ? "debug" : "info",
                    formatters: {
                        bindings: () => ({ pid: `MyClient@${process.pid}` })
                    }
                })
            }
        });
    }
}
```

## With Custom Formatters

```ts
import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { PinoLogger } from "@stegripe/pino-logger";

export class MyClient extends SapphireClient {
    public constructor(clientOptions: SapphireClientOptions) {
        super({
            ...clientOptions,
            logger: {
                instance: new PinoLogger({
                    name: "MyClient",
                    timestamp: true,
                    level: ISDEV ? "debug" : "info",
                    formatters: {
                        bindings: () => ({ pid: `MyClient@${process.pid}` })
                    },
                    transport: {
                        targets: [
                            {
                                target: "pino-pretty",
                                level: ISDEV ? "debug" : "info",
                                options: { translateTime: "SYS:yyyy-mm-dd HH:MM:ss" }
                            }
                        ]
                    }
                })
            }
        });
    }
}
```
