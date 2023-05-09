
import {SDKmanInterface, ShellExecutor, Logger, Sdk, SdkVersion, SDKmanApiClient} from '../models/models'
import {Mode} from "../models/enums";
import DefaultShellExecutor from "./DefaultShellExecutor";
import DefaultSDKmanApiClient from "./DefaultSDKmanApiClient";
import DefaultLogger from "./DefaultLogger";

class SDKman implements SDKmanInterface {
    private static instance: SDKman;

    private shellExecutor!: ShellExecutor;
    private apiClient!: SDKmanApiClient;
    private logger: Logger = DefaultLogger.getInstance();

    private installationDirectory!: string;
    private currentVersion!: string;
    private candidatesApi!: string;
    private candidatesDirectory!: string
    private platform!: string ;
    // TODO: Fix "?"
    private online?: Mode;

    private constructor(shellExecutor?: ShellExecutor, apiClient?: SDKmanApiClient) {
        if (SDKman.instance) {
            return SDKman.instance;
        }

        this.installationDirectory = process.env.SDKMAN_DIR || "";
        this.currentVersion = process.env.SDKMAN_VERSION || "";
        this.candidatesApi = process.env.SDKMAN_CANDIDATES_API || "";
        this.candidatesDirectory = process.env.SDKMAN_CANDIDATES_DIR || "";
        this.platform = process.env.SDKMAN_PLATFORM || "";

        this.shellExecutor = shellExecutor || new DefaultShellExecutor();
        this.apiClient = apiClient || new DefaultSDKmanApiClient(this.candidatesApi);

        SDKman.instance = this;
    }

    public static getInstance(shellExecutor?: ShellExecutor, apiClient?: SDKmanApiClient): SDKman {
        if (!SDKman.instance) {
            SDKman.instance = new SDKman(shellExecutor, apiClient);
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

    public install(sdk: string, version: string, setDefault: boolean): Promise<boolean>;
    public install(sdk: string, setDefault: boolean): Promise<boolean>;
    public install(sdk: string, versionOrSetDefault: string | boolean, setDefault?: boolean): Promise<boolean> {
        const version = typeof versionOrSetDefault === "string" ? versionOrSetDefault : "";
        setDefault = typeof versionOrSetDefault === "boolean" ? versionOrSetDefault : false;

        return Promise.resolve(false);
    }
}

export = SDKman;
