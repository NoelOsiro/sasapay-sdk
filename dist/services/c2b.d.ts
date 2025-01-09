import AuthService from "./auth";
interface C2BPaymentRequest {
    phoneNumber: string;
    amount: number;
    accountReference: string;
    callbackUrl: string;
}
interface C2BPaymentResponse {
    transactionId: string;
    status: string;
    message: string;
}
interface PaymentStatusResponse {
    transactionId: string;
    status: string;
    amount: number;
    phoneNumber: string;
    message: string;
}
declare class C2BService {
    private baseUrl;
    private authService;
    constructor(baseUrl: string, authService: AuthService);
    /**
     * Initiate a C2B payment
     */
    initiatePayment(request: C2BPaymentRequest): Promise<C2BPaymentResponse>;
    /**
     * Check the status of a payment
     */
    getPaymentStatus(transactionId: string): Promise<PaymentStatusResponse>;
}
export default C2BService;
