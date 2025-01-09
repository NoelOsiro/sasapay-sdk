interface AuthConfig {
    clientId: string;
    clientSecret: string;
    baseUrl: string;
}
declare class AuthService {
    private clientId;
    private clientSecret;
    private baseUrl;
    private token;
    private tokenExpiry;
    constructor(config: AuthConfig);
    /**
     * Generate an access token
     */
    getToken(): Promise<string>;
    /**
     * Clear the stored token (useful for force refresh or debugging)
     */
    clearToken(): void;
}
export default AuthService;
