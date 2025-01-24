import AuthService from "../src/services/auth";
import { CONFIG } from "../src/config";

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

  it("should generate a new token after clearing", async () => {
    const token1 = await authService.getToken();
    authService.clearToken();
    const token2 = await authService.getToken();
    expect(token1).not.toBe(token2);
  });

  it("should generate a new token after expiry", async () => {
    const token1 = await authService.getToken();
    authService["tokenExpiry"] = Date.now() - 1000;
    const token2 = await authService.getToken();
    expect(token1).not.toBe(token2);
  });

  it("should throw an error if the request fails", async () => {
    jest.spyOn(authService, 'getToken').mockRejectedValueOnce(new Error("Request failed"));
    await expect(authService.getToken()).rejects.toThrow();
  });

  it("should throw an error if the response is invalid", async () => {
    jest.spyOn(authService, 'getToken').mockRejectedValueOnce(new Error("Invalid response"));
    await expect(authService.getToken()).rejects.toThrow("Invalid response");
  });

  it("should throw an error if the response is missing the access token", async () => {
    jest.spyOn(authService, 'getToken').mockRejectedValueOnce(new Error("Missing access token"));
    await expect(authService.getToken()).rejects.toThrow("Missing access token");
  });

  it("should throw an error if the response is missing the expiry", async () => {
    jest.spyOn(authService, 'getToken').mockRejectedValueOnce(new Error("Missing expiry"));
    await expect(authService.getToken()).rejects.toThrow("Missing expiry");
  });

  it("should throw an error if the response is missing the token type", async () => {
    jest.spyOn(authService, 'getToken').mockRejectedValueOnce(new Error("Missing token type"));
    await expect(authService.getToken()).rejects.toThrow("Missing token type");
  });

  it("should throw an error if the response is missing the scope", async () => {
    jest.spyOn(authService, 'getToken').mockRejectedValueOnce(new Error("Missing scope"));
    await expect(authService.getToken()).rejects.toThrow("Missing scope");
  });


});
