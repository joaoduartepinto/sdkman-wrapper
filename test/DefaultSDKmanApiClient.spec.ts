import {Logger, Sdk, SDKmanApiClient} from "../src/models/models";
import axios from "axios";
import DefaultSDKmanApiClient = require("../src/sdkman/DefaultSDKmanApiClient");
import fs from "fs";

// Mock the axios module
jest.mock("axios");

// Create a mock implementation of the axios module
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("DefaultSDKmanApiClient", () => {
    let apiClient: SDKmanApiClient;

    beforeEach(() => {
        // Reset the mock implementation and clear any mock calls
        mockedAxios.get.mockReset();

        // Create a new instance of the DefaultSDKmanApiClient with the mock Logger
        apiClient = new DefaultSDKmanApiClient("http://api.example.com");
    });

    test("listCandidates method should fetch and parse the candidate list", async () => {
        // Set up the mock response
        const mockResponseFilePath = __dirname + "/resources/listOfCandidates.txt";
        const mockResponse = {
            status: 200,
            data: fs.readFileSync(mockResponseFilePath, "utf-8"),
        };

        // Set the mock implementation of axios.get to return the mock response
        mockedAxios.get.mockResolvedValue(mockResponse);

        // Call the listCandidates method
        const result = await apiClient.listCandidates();

        // Assert the expected behavior
        expect(mockedAxios.get).toHaveBeenCalledWith("http://api.example.com/candidates/list");
        expect(result).toEqual(
            [
                {
                    "name": "Apache ActiveMQ"
                },
                {
                    "name": "Ant"
                },
                {
                    "name": "AsciidoctorJ"
                },
                {
                    "name": "Ballerina"
                }
            ]
        );
    });
});
