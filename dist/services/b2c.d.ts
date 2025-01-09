import AuthService from "./auth";
interface B2CPayoutRequest {
    recipientPhoneNumber: string;
    amount: number;
    reason: string;
    callbackUrl: string;
}
interface B2CPayoutResponse {
    transactionId: string;
    status: string;
    message: string;
}
interface B2CStatusResponse {
    transactionId: string;
    status: string;
    amount: number;
    recipientPhoneNumber: string;
    reason: string;
    message: string;
}
declare class B2CService {
    private baseUrl;
    private authService;
    constructor(baseUrl: string, authService: AuthService);
    /**
     * Make a B2C payout
     */
    makePayout(request: B2CPayoutRequest): Promise<B2CPayoutResponse>;
    /**
     * Get the status of a B2C transaction
     */
    getPayoutStatus(transactionId: string): Promise<B2CStatusResponse>;
}
export default B2CService;
