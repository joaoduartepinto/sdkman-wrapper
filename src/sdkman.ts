import DefaultLogger from "./utils/DefaultLogger";

class SDKman implements SDKmanInterface {
    private static instance: SDKman;
    private shellExecutor!: ShellExecutor;
    private logger: Logger = DefaultLogger.getInstance();

    private currentInstallationDirectory: string = "$HOME/.sdkman";
    private online: boolean = true;

    private constructor(installationDirectory?: string, shellExecutor?: ShellExecutor) {
        if (SDKman.instance) {
            return SDKman.instance;
        }

        this.shellExecutor = shellExecutor || new DefaultShellExecutor();

        if (installationDirectory) {
            this.currentInstallationDirectory = installationDirectory;
        }

        SDKman.instance = this;
    }

    public static getInstance(installationDirectory?: string, shellExecutor?: ShellExecutor): SDKman {
        if (!SDKman.instance) {
            SDKman.instance = new SDKman(installationDirectory, shellExecutor);
        }
        return SDKman.instance;
    }

    public changeMode(): Promise<boolean>;
    public changeMode(mode: string): Promise<boolean>;
    public changeMode(mode?: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public current(): Promise<Map<Sdk, SdkVersion>> {
        return Promise.resolve(new Map<Sdk, SdkVersion>());
    }

    public default(sdk: string, version: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public home(sdk: string, version: string): Promise<SdkVersion> {
        return Promise.resolve({
            installed: true,
            currentlyInUse: true,
            home: "placeholder",
        });
    }

    public isOnline(): Promise<boolean> {
        return Promise.resolve(false);
    }

    public list(): Promise<Sdk[]>;
    public list(sdk: string): Promise<SdkVersion[]>;
    public list(sdk?: string): Promise<Sdk[]> | Promise<SdkVersion[]> {
        return Promise.resolve([]);
    }

    public selfUpdate(): Promise<boolean> {
        return Promise.resolve(false);
    }

    public uninstall(sdk: string, version: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public update(): Promise<Sdk> {
        return Promise.resolve({
            name: "placeholder",
            versions: [],
        });
    }

    public upgrade(): Promise<Map<Sdk, SdkVersion>>;
    public upgrade(sdk: string): Promise<SdkVersion>;
    public upgrade(sdk?: string): Promise<Map<Sdk, SdkVersion>> | Promise<SdkVersion> {
        return Promise.resolve(new Map<Sdk, SdkVersion>());
    }

    public version(): Promise<string> {
        return Promise.resolve("");
    }

    public installationDirectory(): Promise<string> {
        return Promise.resolve("");
    }

    public install(sdk: string, version: string, setDefault: boolean): Promise<boolean>;
    public install(sdk: string, setDefault: boolean): Promise<boolean>;
    public install(sdk: string, versionOrSetDefault: string | boolean, setDefault?: boolean): Promise<boolean> {
        const version = typeof versionOrSetDefault === "string" ? versionOrSetDefault : "";
        setDefault = typeof versionOrSetDefault === "boolean" ? versionOrSetDefault : false;

        return Promise.resolve(false);
    }
}

export = SDKman;
