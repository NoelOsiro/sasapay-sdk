import WebhookHandler from "../src/webhook";
import crypto from "crypto";

describe("WebhookHandler", () => {
  const mockSecretKey = "mock-secret-key";
  const mockEvent = {
    eventType: "PaymentSuccess",
    transactionId: "12345",
    status: "Success",
    amount: 1000,
    customerDetails: { phoneNumber: "254712345678" },
    additionalInfo: {},
  };

  const mockSignature = crypto
    .createHmac("sha256", mockSecretKey)
    .update(JSON.stringify(mockEvent))
    .digest("hex");

  let onEventMock: jest.Mock;

  beforeEach(() => {
    onEventMock = jest.fn();
  });

  it("should process valid webhook events", async () => {
    const webhookHandler = new WebhookHandler({
      secretKey: mockSecretKey,
      onEvent: onEventMock,
    });

    const result = await webhookHandler.handleWebhook(mockEvent, mockSignature);

    expect(onEventMock).toHaveBeenCalledWith(mockEvent);
    expect(result).toBe("Webhook received successfully");
  });

  it("should reject invalid signatures", async () => {
    const invalidSignature = "invalid-signature";
    const webhookHandler = new WebhookHandler({
      secretKey: mockSecretKey,
      onEvent: onEventMock,
    });

    try {
      await webhookHandler.handleWebhook(mockEvent, invalidSignature);
    } catch (err) {
      expect(err.message).toBe("Invalid signature");
    }

    expect(onEventMock).not.toHaveBeenCalled();
  });

  it("should throw an error for invalid payload format", async () => {
    const malformedEvent = "{ malformed JSON }"; // Simulating an invalid JSON

    const webhookHandler = new WebhookHandler({
      secretKey: mockSecretKey,
      onEvent: onEventMock,
    });

    try {
      await webhookHandler.handleWebhook(malformedEvent as any, mockSignature);
    } catch (err) {
      expect(err.message).toBe("Unexpected token m in JSON at position 2");
    }

    expect(onEventMock).not.toHaveBeenCalled();
  });
});
