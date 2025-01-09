interface WebhookEvent {
    eventType: string;
    transactionId: string;
    status: string;
    amount: number;
    customerDetails: Record<string, any>;
    additionalInfo: Record<string, any>;
}
interface WebhookHandlerOptions {
    secretKey: string;
    onEvent: (event: WebhookEvent) => void;
}
declare class WebhookHandler {
    private secretKey;
    private onEvent;
    constructor(options: WebhookHandlerOptions);
    /**
     * Method to verify webhook signature
     */
    verifySignature(payload: any, signature: string): boolean;
    /**
     * This method will be invoked by the HTTP framework to process webhook data.
     * You will need to adapt the calling code depending on the framework you use.
     */
    handleWebhook(payload: any, signature: string): Promise<string>;
}
export default WebhookHandler;
