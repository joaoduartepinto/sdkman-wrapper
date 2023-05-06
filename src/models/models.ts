interface SDKmanInterface {
    install(sdk: string, setDefault: boolean): Promise<boolean>;
    install(sdk: string, version: string, setDefault: boolean): Promise<boolean>;
    uninstall(sdk: string, version: string): Promise<boolean>;
    default(sdk: string, version: string): Promise<boolean>;
    list(): Promise<Sdk[]>;
    list(sdk: string): Promise<Array<SdkVersion>>;
    current(): Promise<Map<Sdk, SdkVersion>>
    version(): Promise<string>;
    upgrade(): Promise<Map<Sdk ,SdkVersion>>;
    upgrade(sdk: string): Promise<SdkVersion>;
    isOnline(): Promise<boolean>;
    changeMode(): Promise<boolean>;
    changeMode(mode: string): Promise<boolean>;
    selfUpdate(): Promise<boolean>;
    update(): Promise<Sdk>;
    home(sdk: string, version: string): Promise<SdkVersion>;
    installationDirectory(): Promise<string>;
}

interface Sdk {
    name: string;
    versions: Array<SdkVersion>;
}

interface SdkVersion {
    installed: boolean;
    currentlyInUse: boolean;
    home: string;
}

interface ShellExecutor {
    execute(command: string): Promise<string>;
}

interface Logger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
