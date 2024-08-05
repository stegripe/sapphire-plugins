<div align="center">

<img src="https://cdn.stegripe.org/images/logo.png" alt="Stegripe Logo" width="135">

# @stegripe/pino-logger

**Plugin for [**`@sapphire/framework`**](https://github.com/sapphire/framework) used to handle logging with Pino.**

[![GitHub](https://img.shields.io/github/license/stegripe/sapphire-plugins)](https://github.com/stegripe/sapphire-plugins/blob/main/LICENSE.md)
<a href="https://www.npmjs.com/package/@stegripe/pino-logger">
  <img src="https://img.shields.io/npm/v/@stegripe/pino-logger?maxAge=3600" alt="npm version" ></a>
  <img src="https://img.shields.io/npm/dt/@stegripe/pino-logger?maxAge=3600" alt="npm downloads">

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
                        targets: [{
                            target: "pino-pretty",
                            level: ISDEV ? "debug" : "info",
                            options: { translateTime: "SYS:yyyy-mm-dd HH:MM:ss" }
                        }]
                    }
                })
            }
        });
    }
}
```
