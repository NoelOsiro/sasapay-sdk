import axios from "axios";
import AuthService from "./auth";

export interface RemitDisbursementRequest {
    MerchantCode:string,
    MerchantTransactionReference:string,
    DestinationChannelCode:string,
    DestinationChannelName:string,
    Currency:string,
    Amount:string,
    ReceiverPhoneNumber:string,
    ReceiverAccountNumber:string,
    AccountReference :string,
    ReceiverAccountType :string,
    ReceiverAccountName:string,
    ForeignCurrency:string,
    SenderPhoneNumber:string,
    SenderName:string,
    SenderDOB:string,
    SenderCountryISO:string,
    SenderNationality:string,
    SenderIDType:string,
    SenderIDNumber:string,
    SenderServiceProviderName:string,
    RemittancePurpose:string,
    CallbackURL:string,
    Remarks :string
}

export interface RemitDisbursementResponse {
    status: boolean;
    detail: string;
    ResponseCode: string;
    RequestID: string;
    MerchantRequestID: string;
    TransactionCharges: string;
  }


class RemitService {
  private baseUrl: string;
  private authService: AuthService;

  constructor(baseUrl: string, authService: AuthService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  /**
   * Initiate a Remit disbursement
   */
  public async disburseRemit(request: RemitDisbursementRequest): Promise<RemitDisbursementResponse> {
    const token = await this.authService.getToken();
    const response = await axios.post<RemitDisbursementResponse>(
      `${this.baseUrl}/remittances/remittance-payments/`,
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

export default RemitService;
