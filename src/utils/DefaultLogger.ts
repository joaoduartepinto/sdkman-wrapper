class DefaultLogger implements Logger {
    private static instance: Logger;

    private constructor() {
        // Initialize logger instance
    }

    static getInstance(): Logger {
        if (!DefaultLogger.instance) {
            DefaultLogger.instance = new DefaultLogger();
        }
        return DefaultLogger.instance;
    }

    info(message: string): void {
        // Log info message
    }

    warn(message: string): void {
        // Log warning message
    }

    error(message: string): void {
        // Log error message
    }
}

export default DefaultLogger;
