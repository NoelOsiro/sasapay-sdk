"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthService {
    constructor(config) {
        this.token = null;
        this.tokenExpiry = null;
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.baseUrl = config.baseUrl;
    }
    /**
     * Generate an access token
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
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
                const response = yield axios_1.default.get(`${this.baseUrl}/auth/token/?grant_type=client_credentials`, requestOptions);
                if (!response.data.status) {
                    throw new Error(response.data.detail);
                }
                this.token = response.data.access_token;
                this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
                return this.token;
            }
            catch (error) {
                // More detailed error handling
                if (axios_1.default.isAxiosError(error)) {
                    // Axios-specific errors (network issues, request/response errors)
                    console.error("Axios error:", error.message);
                    if (error.response) {
                        console.error("Error Response Data:", error.response.data);
                        console.error("Error Response Status:", error.response.status);
                    }
                }
                else {
                    // Non-Axios error (e.g., thrown manually)
                    console.error("Error:", error.message);
                }
                throw new Error("Unable to fetch token");
            }
        });
    }
    /**
     * Clear the stored token (useful for force refresh or debugging)
     */
    clearToken() {
        this.token = null;
        this.tokenExpiry = null;
    }
}
exports.default = AuthService;
