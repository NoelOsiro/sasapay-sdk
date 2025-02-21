import AuthService from "./auth";
export interface C2BPaymentRequest {
    MerchantCode: string;
    NetworkCode: string;
    TransactionFee: number;
    Currency: string;
    Amount: number;
    CallBackURL: string;
    PhoneNumber: string;
    TransactionDesc: string;
    AccountReference: string;
}
export interface C2BPaymentResponse {
    status: boolean;
    detail: string;
    PaymentGateway: string;
    MerchantRequestID: string;
    CheckoutRequestID: string;
    TransactionReference: string;
    ResponseCode: string;
    ResponseDescription: string;
    CustomerMessage: string;
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
