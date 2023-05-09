import {ShellExecutor} from "../models/models";

class DefaultShellExecutor implements ShellExecutor {
    async execute(command: string): Promise<string> {
        // Implement...
        return Promise.resolve("");
    }
}

export = DefaultShellExecutor
