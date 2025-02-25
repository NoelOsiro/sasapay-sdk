import AuthService from "./services/auth";
import C2BService from "./services/c2b";
import B2CService from "./services/b2c";
import B2BService from "./services/b2b";
import RemitService from "./services/remit";
import CheckService from "./services/check";
import { CONFIG } from "./config";
import { C2BPaymentRequest, C2BGetPaymentStatusRequest } from "./services/c2b";
import { B2CPayoutRequest } from "./services/b2c";
import { B2BPaymentRequest } from "./services/b2b";
import { RemitDisbursementRequest } from "./services/remit";
import { CheckRequest, VerifyTransactionRequest, VerifyTransactionResponse } from "./services/check";
import BulkService,{ BulkPaymentRequest, BulkPaymentResponse } from "./services/bulk";

interface SasaPayConfig {
  clientId?: string;
  clientSecret?: string;
  environment?: string;
}
function isValidEnvironment(env: string | undefined): env is "sandbox" | "production" {
  return env === "sandbox" || env === "production";
}
class SasaPay {
  private authService: AuthService;
  private c2bService: C2BService;
  private b2cService: B2CService;
  private b2bService: B2BService;
  private remitService: RemitService;
  private checkService: CheckService;
  private bulkService: BulkService;

  constructor(config: SasaPayConfig) {
    const clientId = config.clientId || process.env.CLIENT_ID || CONFIG.clientId;
    const clientSecret = config.clientSecret || process.env.CLIENT_SECRET || CONFIG.clientSecret;
    let environment = config.environment || process.env.ENVIRONMENT || "sandbox"; // Default to "sandbox"
    // Validate the environment value
    if (!isValidEnvironment(environment)) {
      throw new Error(`Invalid environment value: ${environment}. Expected "sandbox" or "production".`);
  }
    const baseUrl = environment === "production"
      ? "https://api.sasapay.app/api/v1"
      : "https://sandbox.sasapay.app/api/v1";

    this.authService = new AuthService({
      clientId: clientId,
      clientSecret: clientSecret,
      baseUrl: baseUrl,
    });

    this.c2bService = new C2BService(baseUrl, this.authService);
    this.b2cService = new B2CService(baseUrl, this.authService);
    this.b2bService = new B2BService(baseUrl, this.authService);
    this.remitService = new RemitService(baseUrl, this.authService);
    this.checkService = new CheckService(baseUrl, this.authService);
    this.bulkService = new BulkService(baseUrl, this.authService);
  }

  // Auth methods
  async getAccessToken() {
    return this.authService.getToken();
  }

  // C2B methods
  async processC2B(params: C2BPaymentRequest) {
    return this.c2bService.initiatePaymentRequest(params);
  }

  async getC2BPaymentStatus(params: C2BGetPaymentStatusRequest) {
    return this.c2bService.getPaymentStatus(params);
  }

  // B2C methods
  async processB2C(params: B2CPayoutRequest) {
    return this.b2cService.makeB2CPayout(params);
  }

  // B2B methods
  async processB2B(params: B2BPaymentRequest) {
    return this.b2bService.initiatePayment(params);
  }

  // Remit methods
  async processRemit(params: RemitDisbursementRequest) {
    return this.remitService.disburseRemit(params);
  }

  // Check methods
  async processCheck(params: CheckRequest) {
    return this.checkService.check(params);
  }

  // Utility methods
  async getAccountBalance(MerchantCode: string) {
    return this.checkService.getAccountBalance(MerchantCode);
  }

  async verifyTransaction(request: VerifyTransactionRequest): Promise<VerifyTransactionResponse> {
    return this.checkService.verifyTransaction(request);
  }

  async initiateBulkPayment(request: BulkPaymentRequest): Promise<BulkPaymentResponse> {
    return this.bulkService.initiateBulkPayment(request);
  }
}

export default SasaPay;