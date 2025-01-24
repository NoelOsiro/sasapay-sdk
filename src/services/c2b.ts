import axios from "axios";
import AuthService from "./auth";

interface C2BPaymentRequest {
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


interface C2BPaymentResponse {
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

class C2BService {
  private baseUrl: string;
  private authService: AuthService;

  constructor(baseUrl: string, authService: AuthService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  /**
   * Initiate a C2B payment
   */
  public async initiatePayment(request: C2BPaymentRequest): Promise<C2BPaymentResponse> {
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
  public async getPaymentStatus(transactionId: string): Promise<PaymentStatusResponse> {
    const token = await this.authService.getToken();
    const response = await axios.get<PaymentStatusResponse>(
      `${this.baseUrl}/c2b/payment/status/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
}

export default C2BService;
