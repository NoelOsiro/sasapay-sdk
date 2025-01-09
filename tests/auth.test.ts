import AuthService from "../src/services/auth";
import { CONFIG } from "../config";

describe("AuthService", () => {
  const authService = new AuthService({
    clientId: CONFIG.clientId,
    clientSecret: CONFIG.clientSecret,
    baseUrl: CONFIG.baseUrl,
  });

  it("should generate a token", async () => {
    const token = await authService.getToken();
    expect(typeof token).toBe("string");
  });

  it("should cache the token until expiry", async () => {
    const token1 = await authService.getToken();
    const token2 = await authService.getToken();
    expect(token1).toBe(token2);
  });

  it("should clear the token", () => {
    authService.clearToken();
    expect(authService["token"]).toBeNull();
    expect(authService["tokenExpiry"]).toBeNull();
  });
});
