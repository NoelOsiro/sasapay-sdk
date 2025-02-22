import axios from "axios";
import AuthService from "./auth";

export interface BulkPaymentRequest {
    merchant_code: string;
    bulk_payment_reference: string;
    description: string;
    debit_account_number:string;
    charges_account_number:string;
    callback_url:string;
    payment_details: 
      {
        receiver_name: string;
        account_number: string;
        channel_code: string;
        amount: string;
        payment_reference: string;
        payment_reason: string;
      }[]
  }

export interface BulkPaymentResponse {
  status: boolean;
  detail: string;
  B2BRequestID: string;
  ConversationID: string;
  OriginatorConversationID: string;
  TransactionCharges: string;
  ResponseCode: string;
  ResponseDescription: string;
}
interface BulkStatusResponse {
  transactionId: string;
  status: string;
  amount: number;
  recipientBusinessId: string;
  paymentReason: string;
  message: string;
}

class BulkService {
  private baseUrl: string;
  private authService: AuthService;

  constructor(baseUrl: string, authService: AuthService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  /**
   * Initiate a B2B payment
   */
  public async initiateBulkPayment(request: BulkPaymentRequest): Promise<BulkPaymentResponse> {
    const token = await this.authService.getToken();
    const response = await axios.post<BulkPaymentResponse>(
      `${this.baseUrl}/payments/bulk-payments/`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }

}

export default BulkService;
