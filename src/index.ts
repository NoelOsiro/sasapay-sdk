import AuthService from "./services/auth";
import C2BService from "./services/c2b";
import B2CService from "./services/b2c";
import B2BService from "./services/b2b";
import { CONFIG } from "./config";
import { C2BPaymentRequest } from "./services/c2b";
import { B2CPayoutRequest } from "./services/b2c";
import { B2BPaymentRequest } from "./services/b2b";

interface SasaPayConfig {
  clientId: string;
  clientSecret: string;
  environment?: "sandbox" | "production";
}

class SasaPay {
  private authService: AuthService;
  private c2bService: C2BService;
  private b2cService: B2CService;
  private b2bService: B2BService;

  constructor(config: SasaPayConfig) {
    const baseUrl = config.environment === "production" 
      ? "https://api.sasapay.app/api/v1"
      : "https://sandbox.sasapay.app/api/v1";

    this.authService = new AuthService({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      baseUrl: baseUrl,
    });

    this.c2bService = new C2BService(baseUrl, this.authService);
    this.b2cService = new B2CService(baseUrl, this.authService);
    this.b2bService = new B2BService(baseUrl, this.authService);
  }

  // Auth methods
  async getAccessToken() {
    return this.authService.getToken();
  }

  // C2B methods
  async processC2B(params: C2BPaymentRequest) {
    return this.c2bService.initiatePayment(params);
  }

  // B2C methods
  async processB2C(params: B2CPayoutRequest) {
    return this.b2cService.makePayout(params);
  }

  // B2B methods
  async processB2B(params: B2BPaymentRequest) {
    return this.b2bService.initiatePayment(params);
  }
}

const sasaPay = new SasaPay({
  clientId: CONFIG.clientId,
  clientSecret: CONFIG.clientSecret,
});

export default sasaPay;
