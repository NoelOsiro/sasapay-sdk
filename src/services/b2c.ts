import axios from "axios";
import AuthService from "./auth";

export interface B2CPayoutRequest {
  MerchantCode: string;
  MerchantTransactionReference: string;
  Amount: string;
  Currency: string;
  ReceiverNumber: string;
  Channel: string;
  Reason: string;
  CallBackURL: string
}

export interface B2CPayoutResponse {
  status: boolean,
  detail: string,
  B2CRequestID: string,
  ConversationID: string,
  OriginatorConversationID: string,
  TransactionCharges: string,
  ResponseCode: string,
  ResponseDescription: string
}

export interface B2CStatusResponse {
  MerchantCode: string,
  DestinationChannel: string,
  RecipientName: string,
  RecipientAccountNumber: string,
  ResultCode: string,
  CheckoutRequestID: string,
  MerchantRequestID: string,
  ResultDesc: string,
  SourceChannel: string,
  SasaPayTransactionCode: string,
  LinkedTransactionCode: string,
  TransactionDate: string,
  TransactionAmount: string,
  TransactionCharge: string,
  SasaPayTransactionID: string,
  ThirdPartyTransactionCode: string,
  MerchantTransactionReference: string,
  MerchantAccountBalance: string
}
class B2CService {
  private baseUrl: string;
  private authService: AuthService;

  constructor(baseUrl: string, authService: AuthService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  /**
   * Make a B2C payout
   */
  public async makeB2CPayout(request: B2CPayoutRequest): Promise<B2CPayoutResponse> {
    const token = await this.authService.getToken();
    const response = await axios.post<B2CPayoutResponse>(
      `${this.baseUrl}/payments/b2c/`,
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

  /**
   * Get the status of a B2C transaction
   */
  public async getPayoutStatus(transactionId: string): Promise<B2CStatusResponse> {
    const token = await this.authService.getToken();
    const response = await axios.get<B2CStatusResponse>(
      `${this.baseUrl}/b2c/payout/status/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
}

export default B2CService;
