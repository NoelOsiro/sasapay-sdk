import axios from "axios";
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
    const token = await this.authService.getToken();
    const response = await axios.post<C2BPaymentResponse>(
      `${this.baseUrl}/c2b/payment`,
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
