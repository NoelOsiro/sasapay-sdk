import { C2BPaymentRequest } from "./services/c2b";
import { B2CPayoutRequest } from "./services/b2c";
import { B2BPaymentRequest } from "./services/b2b";
interface SasaPayConfig {
    clientId?: string;
    clientSecret?: string;
    environment?: string;
}
declare class SasaPay {
    private authService;
    private c2bService;
    private b2cService;
    private b2bService;
    constructor(config: SasaPayConfig);
    getAccessToken(): Promise<string>;
    processC2B(params: C2BPaymentRequest): Promise<import("./services/c2b").C2BPaymentResponse>;
    processB2C(params: B2CPayoutRequest): Promise<import("./services/b2c").B2CPayoutResponse>;
    processB2B(params: B2BPaymentRequest): Promise<import("./services/b2b").B2BPaymentResponse>;
}
declare const sasaPay: SasaPay;
export default sasaPay;
