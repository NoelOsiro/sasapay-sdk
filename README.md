# SasaPay Webhook Handler

This package provides an easy-to-use webhook handler for integrating with the SasaPay API. It supports signature verification and event processing in a framework-agnostic way, making it flexible for various environments.

## Features

- Framework-agnostic webhook handler
- Signature verification for security
- Callback for event handling
- Easy integration into any HTTP server

## Installation

You can install this package via npm:

```bash
npm install sasapay-webhook-handler

## Usage
import WebhookHandler from "sasapay-webhook-handler";
import crypto from "crypto";

// Define your secret key and event handling logic
const webhookHandler = new WebhookHandler({
  secretKey: "your-secret-key",
  onEvent: (event) => {
    console.log("Received event:", event);
  },
});

// Sample event and signature (for testing purposes)
const mockEvent = {
  eventType: "PaymentSuccess",
  transactionId: "12345",
  status: "Success",
  amount: 1000,
  customerDetails: { phoneNumber: "254712345678" },
  additionalInfo: {},
};

const mockSignature = crypto
  .createHmac("sha256", "your-secret-key")
  .update(JSON.stringify(mockEvent))
  .digest("hex");

// Handle the webhook event
webhookHandler
  .handleWebhook(mockEvent, mockSignature)
  .then((message) => {
    console.log(message);  // "Webhook received successfully"
  })
  .catch((error) => {
    console.error(error);  // "Invalid signature" or other errors
  });
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

### 2. **Add Keywords to `package.json`**

To make your package discoverable, add relevant keywords in `package.json`:

```json
{
  "name": "sasapay-webhook-handler",
  "version": "1.0.0",
  "description": "A framework-agnostic webhook handler for SasaPay API.",
  "main": "src/index.ts",
  "scripts": {
    "test": "jest"
  },
  "keywords": [
    "sasapay",
    "webhook",
    "payment",
    "signature-verification",
    "event-processing"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "crypto": "^1.0.1"
  },
  "devDependencies": {
    "jest": "^27.0.6",
    "@types/jest": "^27.0.1"
  }
}
