import axios from "axios";
import AuthService from "./auth";

export interface CheckRequest {
  MerchantCode: string;
  CheckoutRequestId: string;
  MerchantTransactionReference: string;
  TransactionCode: string;
  CallbackUrl: string;
}

export interface CheckResponse {
    statusCode: string;
    message: string;
}

export interface AccountBalanceResponse {
    statusCode: string;
    message: string;
    data: {
      CurrencyCode: string;
      OrgAccountBalance: number;
      Accounts: {
          account_label: string;
          account_balance: number;
      }[];
    };
}

export interface VerifyTransactionRequest {
    merchantCode: string;
    transactionCode: string;
}

export interface VerifyTransactionResponse {
    statusCode: number;
    detail: string;
    data: {
      TransactionType: string;
      TransID: string;
      TransTime: string;
      TransAmount: string;
      MerchantCode: string;
      BillRefNumber: string;
      InvoiceNumber: string;
      OrgAccountBalance: string;
      CustomerMobile: string;
      FirstName: string;
      MiddleName: string;
      LastName: string;
    }
  }
  

class CheckService {
  private baseUrl: string;
  private authService: AuthService;

  constructor(baseUrl: string, authService: AuthService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  /**
   * Initiate a Remit disbursement
   */
  public async check(request: CheckRequest): Promise<CheckResponse> {
    const token = await this.authService.getToken();
    const response = await axios.post<CheckResponse>(
      `${this.baseUrl}/transactions/status-query/`,
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
   * Get the balance of an account
   */
  public async getAccountBalance(MerchantCode: string): Promise<AccountBalanceResponse> {
    const token = await this.authService.getToken();
    const response = await axios.get<AccountBalanceResponse>(
      `${this.baseUrl}/payments/check-balance/?MerchantCode=${MerchantCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }

  
  /**
   * Verify Transaction
   */
  public async verifyTransaction(request: VerifyTransactionRequest): Promise<VerifyTransactionResponse> {
    const token = await this.authService.getToken();
    const response = await axios.post<VerifyTransactionResponse>(
      `${this.baseUrl}/v1/transactions/verify/`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
}

export default CheckService;
