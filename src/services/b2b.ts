import axios from "axios";
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

class B2BService {
  private baseUrl: string;
  private authService: AuthService;

  constructor(baseUrl: string, authService: AuthService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  /**
   * Initiate a B2B payment
   */
  public async initiatePayment(request: B2BPaymentRequest): Promise<B2BPaymentResponse> {
    const token = await this.authService.getToken();
    const response = await axios.post<B2BPaymentResponse>(
      `${this.baseUrl}/b2b/payment`,
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
   * Get the status of a B2B payment transaction
   */
  public async getPaymentStatus(transactionId: string): Promise<B2BStatusResponse> {
    const token = await this.authService.getToken();
    const response = await axios.get<B2BStatusResponse>(
      `${this.baseUrl}/b2b/payment/status/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
}

export default B2BService;
