import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface AuthConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
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

    const response = await axios.post<TokenResponse>(`${this.baseUrl}/oauth/token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
    });

    this.token = response.data.access_token;
    this.tokenExpiry = Date.now() + response.data.expires_in * 1000;

    return this.token;
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
