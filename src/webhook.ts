import crypto from "crypto";

interface WebhookEvent {
  eventType: string;
  transactionId: string;
  status: string;
  amount: number;
  customerDetails: Record<string, any>;
  additionalInfo: Record<string, any>;
}

interface WebhookHandlerOptions {
  secretKey: string; // Secret key for verifying webhook signatures
  onEvent: (event: WebhookEvent) => void; // Callback to process webhook events
}

class WebhookHandler {
  private secretKey: string;
  private onEvent: (event: WebhookEvent) => void;

  constructor(options: WebhookHandlerOptions) {
    this.secretKey = options.secretKey;
    this.onEvent = options.onEvent;
  }

  /**
   * Method to verify webhook signature
   */
  public verifySignature(payload: any, signature: string): boolean {
    const hash = crypto
      .createHmac("sha256", this.secretKey)
      .update(JSON.stringify(payload))
      .digest("hex");
    return hash === signature;
  }

  /**
   * This method will be invoked by the HTTP framework to process webhook data.
   * You will need to adapt the calling code depending on the framework you use.
   */
  public async handleWebhook(payload: any, signature: string): Promise<string> {
    // Verify the signature
    if (!this.verifySignature(payload, signature)) {
      throw new Error("Invalid signature");
    }

    // Process the webhook event
    const event: WebhookEvent = payload;
    this.onEvent(event);

    // Return a success message
    return "Webhook received successfully";
  }
}

export default WebhookHandler;
