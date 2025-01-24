import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface AuthConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}

interface TokenResponse {
  status: boolean;
  detail: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

class AuthService {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  constructor(config: AuthConfig) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.baseUrl = config.baseUrl;
  }

  /**
   * Generate an access token
   */
  public async getToken(): Promise<string> {
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }
  
    try {
      const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
      const requestOptions = {
        headers: {
          Authorization: `Basic ${credentials}`,
        }
      };
  
      const response = await axios.get<TokenResponse>(
        `${this.baseUrl}/auth/token/?grant_type=client_credentials`,
        requestOptions
      );
  
      if (!response.data.status) {
        throw new Error(response.data.detail);
      }
  
      this.token = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
  
      return this.token;
    } catch (error:any) {
      // More detailed error handling
      if (axios.isAxiosError(error)) {
        // Axios-specific errors (network issues, request/response errors)
        console.error("Axios error:", error.message);
        if (error.response) {
          console.error("Error Response Data:", error.response.data);
          console.error("Error Response Status:", error.response.status);
        }
      } else {
        // Non-Axios error (e.g., thrown manually)
        console.error("Error:", error.message);
      }
      throw new Error("Unable to fetch token");
    }
  }
  
  

  /**
   * Clear the stored token (useful for force refresh or debugging)
   */
  public clearToken(): void {
    this.token = null;
    this.tokenExpiry = null;
  }
}

export default AuthService;
