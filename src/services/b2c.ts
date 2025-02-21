import axios from "axios";
import AuthService from "./auth";

export interface B2CPayoutRequest {
  recipientPhoneNumber: string;
  amount: number;
  reason: string;
  callbackUrl: string;
}

export interface B2CPayoutResponse {
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
  public async makePayout(request: B2CPayoutRequest): Promise<B2CPayoutResponse> {
    const token = await this.authService.getToken();
    const response = await axios.post<B2CPayoutResponse>(
      `${this.baseUrl}/b2c/payout`,
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
