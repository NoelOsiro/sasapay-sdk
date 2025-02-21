import AuthService from "./auth";
export interface B2BPaymentRequest {
    recipientBusinessId: string;
    amount: number;
    paymentReason: string;
    callbackUrl: string;
}
export interface B2BPaymentResponse {
    transactionId: string;
    status: string;
    message: string;
}
interface B2BStatusResponse {
    transactionId: string;
    status: string;
    amount: number;
    recipientBusinessId: string;
    paymentReason: string;
    message: string;
}
declare class B2BService {
    private baseUrl;
    private authService;
    constructor(baseUrl: string, authService: AuthService);
    /**
     * Initiate a B2B payment
     */
    initiatePayment(request: B2BPaymentRequest): Promise<B2BPaymentResponse>;
    /**
     * Get the status of a B2B payment transaction
     */
    getPaymentStatus(transactionId: string): Promise<B2BStatusResponse>;
}
export default B2BService;
