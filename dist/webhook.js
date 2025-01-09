"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class WebhookHandler {
    constructor(options) {
        this.secretKey = options.secretKey;
        this.onEvent = options.onEvent;
    }
    /**
     * Method to verify webhook signature
     */
    verifySignature(payload, signature) {
        const hash = crypto_1.default
            .createHmac("sha256", this.secretKey)
            .update(JSON.stringify(payload))
            .digest("hex");
        return hash === signature;
    }
    /**
     * This method will be invoked by the HTTP framework to process webhook data.
     * You will need to adapt the calling code depending on the framework you use.
     */
    handleWebhook(payload, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify the signature
            if (!this.verifySignature(payload, signature)) {
                throw new Error("Invalid signature");
            }
            // Process the webhook event
            const event = payload;
            this.onEvent(event);
            // Return a success message
            return "Webhook received successfully";
        });
    }
}
exports.default = WebhookHandler;
