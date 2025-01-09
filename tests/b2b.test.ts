import B2BService from "../src/services/b2b";
import AuthService from "../src/services/auth";
import { CONFIG } from "../config";

jest.mock("axios"); // Mock Axios for testing API requests

const authService = new AuthService({
  clientId: CONFIG.clientId,
  clientSecret: CONFIG.clientSecret,
  baseUrl: CONFIG.baseUrl,
});

const b2bService = new B2BService(CONFIG.baseUrl, authService);

describe("B2BService", () => {
  it("should initiate a B2B payment", async () => {
    const mockRequest = {
      recipientBusinessId: "BUSINESS123",
      amount: 5000,
      paymentReason: "Supplier Payment",
      callbackUrl: "https://example.com/callback",
    };

    const mockResponse = {
      transactionId: "12345",
      status: "Pending",
      message: "Payment initiated successfully",
    };

    jest.spyOn(authService, "getToken").mockResolvedValue("mock-token");
    jest.spyOn(require("axios"), "post").mockResolvedValue({ data: mockResponse });

    const response = await b2bService.initiatePayment(mockRequest);

    expect(response).toEqual(mockResponse);
  });

  it("should get the B2B payment status", async () => {
    const mockTransactionId = "12345";
    const mockResponse = {
      transactionId: "12345",
      status: "Success",
      amount: 5000,
      recipientBusinessId: "BUSINESS123",
      paymentReason: "Supplier Payment",
      message: "Payment successful",
    };

    jest.spyOn(authService, "getToken").mockResolvedValue("mock-token");
    jest.spyOn(require("axios"), "get").mockResolvedValue({ data: mockResponse });

    const response = await b2bService.getPaymentStatus(mockTransactionId);

    expect(response).toEqual(mockResponse);
  });
});
