import C2BService from "../src/services/c2b";
import AuthService from "../src/services/auth";
import { CONFIG } from "../config";

jest.mock("axios"); // Mock Axios for testing API requests

const authService = new AuthService({
  clientId: CONFIG.clientId,
  clientSecret: CONFIG.clientSecret,
  baseUrl: CONFIG.baseUrl,
});

const c2bService = new C2BService(CONFIG.baseUrl, authService);

describe("C2BService", () => {
  it("should initiate a C2B payment", async () => {
    const mockRequest = {
      phoneNumber: "254712345678",
      amount: 500,
      accountReference: "Invoice123",
      callbackUrl: "https://example.com/callback",
    };

    const mockResponse = {
      transactionId: "12345",
      status: "Pending",
      message: "Payment initiated successfully",
    };

    jest.spyOn(authService, "getToken").mockResolvedValue("mock-token");
    jest.spyOn(require("axios"), "post").mockResolvedValue({ data: mockResponse });

    const response = await c2bService.initiatePayment(mockRequest);

    expect(response).toEqual(mockResponse);
  });

  it("should get the payment status", async () => {
    const mockTransactionId = "12345";
    const mockResponse = {
      transactionId: "12345",
      status: "Success",
      amount: 500,
      phoneNumber: "254712345678",
      message: "Payment successful",
    };

    jest.spyOn(authService, "getToken").mockResolvedValue("mock-token");
    jest.spyOn(require("axios"), "get").mockResolvedValue({ data: mockResponse });

    const response = await c2bService.getPaymentStatus(mockTransactionId);

    expect(response).toEqual(mockResponse);
  });
});