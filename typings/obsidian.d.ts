declare module 'obsidian' {
    export class Plugin {
        addCommand(command: Command): void;
    }

    export interface Command {
        id: string;
        name: string;
        callback: () => void;
    }
}
