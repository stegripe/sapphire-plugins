import { inspect } from "node:util";
import { Logger as BuiltinLogger, LogLevel } from "@sapphire/framework";
import { cast } from "@sapphire/utilities";
import type { Level, Logger, LoggerOptions } from "pino";
import { pino } from "pino";

export class PinoLogger extends BuiltinLogger {
    public readonly pino: Logger;

    public constructor(options: LoggerOptions) {
        super(options.levelVal ?? LogLevel.Info);
        this.pino = pino(options);
    }

    public override has(level: LogLevel): boolean {
        return this.pino.levelVal <= Number(level.toString());
    }

    public override write(level: LogLevel, ...values: readonly unknown[]): void {
        if (level < this.level) return;

        const method = cast<Level>(this.pino.levels.labels[level]);
        const message = values
            .map(value => (typeof value === "string" ? value : inspect(value, { depth: 0 })))
            .join(" ");

        this.pino[method](message);
    }
}
