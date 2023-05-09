import { Logger, Sdk, SDKmanApiClient } from "../models/models";
import axios, { AxiosResponse } from "axios";
import DefaultLogger from "./DefaultLogger";

class DefaultSDKmanApiClient implements SDKmanApiClient {
    private api: string;
    private logger: Logger = DefaultLogger.getInstance();

    constructor(apiClient: string) {
        this.api = apiClient;
    }

    async listCandidates(): Promise<Array<Sdk>> {
        const rawListOfCandidates: string = await this.fetch("/candidates/list");

        const parsedResponse: Array<Sdk> = this.parseCandidateList(rawListOfCandidates);

        return Promise.resolve(parsedResponse);
    }

    private async fetch(uri: string): Promise<string> {
        let request = this.api + uri;

        try {
            const response: AxiosResponse<string> = await axios.get(request);

            if (response.status === 200) {
                const data = response.data;
                return data;
            } else {
                throw new Error("Request failed");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`Failed request: ` + request);
                this.logger.error(error.message);
            } else {
                this.logger.error(`Failed request: ` + request);
                this.logger.error("Unknown error occurred.");
            }
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    private parseCandidateList(rawListOfCandidates: string): Array<Sdk> {
        const regex = /(?<=^\-{80}\n)([^\(\n]+)/gm;
        const matches = [...rawListOfCandidates.matchAll(regex)];

        const sdkArray: Array<Sdk> = matches.map((match) => ({ name: match[1].trim() }));

        return sdkArray;
    }
}

export = DefaultSDKmanApiClient;
