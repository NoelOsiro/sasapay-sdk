import axios from "axios";
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

export interface C2BGetPaymentStatusRequest {
  CheckoutRequestID: string;
  MerchantCode: string;
  VerificationCode: string;
}

export interface C2BGetPaymentStatusResponse {
  status: boolean;
  detail: string;
}


class C2BService {
  private baseUrl: string;
  private authService: AuthService;

  constructor(baseUrl: string, authService: AuthService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  /**
   * Initiate a C2B payment Request
   */
  public async initiatePaymentRequest(request: C2BPaymentRequest): Promise<C2BPaymentResponse> {
    try {
      const token = await this.authService.getToken();
      console.log("Fetched Token:", token);
  
      const response = await axios.post<C2BPaymentResponse>(
        `${this.baseUrl}/payments/request-payment/`,
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error during payment initiation:", error);
      throw error; // Rethrow to let the caller handle it
    }
  }

  /**
   * Check the status of a payment
   */
  public async getPaymentStatus(request: C2BGetPaymentStatusRequest): Promise<C2BGetPaymentStatusResponse> {
    const token = await this.authService.getToken();
    const response = await axios.post<C2BGetPaymentStatusResponse>(
      `${this.baseUrl}/payments/process-payment/`,
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

export default C2BService;
