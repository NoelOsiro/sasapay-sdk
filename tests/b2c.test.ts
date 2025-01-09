import B2CService from "../src/services/b2c";
import AuthService from "../src/services/auth";
import { CONFIG } from "../config";

jest.mock("axios"); // Mock Axios for testing API requests

const authService = new AuthService({
  clientId: CONFIG.clientId,
  clientSecret: CONFIG.clientSecret,
  baseUrl: CONFIG.baseUrl,
});

const b2cService = new B2CService(CONFIG.baseUrl, authService);

describe("B2CService", () => {
  it("should make a B2C payout", async () => {
    const mockRequest = {
      recipientPhoneNumber: "254712345678",
      amount: 1000,
      reason: "Salary Payment",
      callbackUrl: "https://example.com/callback",
    };

    const mockResponse = {
      transactionId: "67890",
      status: "Pending",
      message: "Payout initiated successfully",
    };

    jest.spyOn(authService, "getToken").mockResolvedValue("mock-token");
    jest.spyOn(require("axios"), "post").mockResolvedValue({ data: mockResponse });

    const response = await b2cService.makePayout(mockRequest);

    expect(response).toEqual(mockResponse);
  });

  it("should get the B2C payout status", async () => {
    const mockTransactionId = "67890";
    const mockResponse = {
      transactionId: "67890",
      status: "Success",
      amount: 1000,
      recipientPhoneNumber: "254712345678",
      reason: "Salary Payment",
      message: "Payout successful",
    };

    jest.spyOn(authService, "getToken").mockResolvedValue("mock-token");
    jest.spyOn(require("axios"), "get").mockResolvedValue({ data: mockResponse });

    const response = await b2cService.getPayoutStatus(mockTransactionId);

    expect(response).toEqual(mockResponse);
  });
});
