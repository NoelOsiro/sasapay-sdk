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
const auth_1 = __importDefault(require("./services/auth"));
const c2b_1 = __importDefault(require("./services/c2b"));
const b2c_1 = __importDefault(require("./services/b2c"));
const b2b_1 = __importDefault(require("./services/b2b"));
const config_1 = require("./config");
function isValidEnvironment(env) {
    return env === "sandbox" || env === "production";
}
class SasaPay {
    constructor(config) {
        const clientId = config.clientId || process.env.CLIENT_ID || config_1.CONFIG.clientId;
        const clientSecret = config.clientSecret || process.env.CLIENT_SECRET || config_1.CONFIG.clientSecret;
        let environment = config.environment || process.env.ENVIRONMENT || "sandbox"; // Default to "sandbox"
        // Validate the environment value
        // Validate the environment value
        if (!isValidEnvironment(environment)) {
            throw new Error(`Invalid environment value: ${environment}. Expected "sandbox" or "production".`);
        }
        const baseUrl = environment === "production"
            ? "https://api.sasapay.app/api/v1"
            : "https://sandbox.sasapay.app/api/v1";
        this.authService = new auth_1.default({
            clientId: clientId,
            clientSecret: clientSecret,
            baseUrl: baseUrl,
        });
        this.c2bService = new c2b_1.default(baseUrl, this.authService);
        this.b2cService = new b2c_1.default(baseUrl, this.authService);
        this.b2bService = new b2b_1.default(baseUrl, this.authService);
    }
    // Auth methods
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.getToken();
        });
    }
    // C2B methods
    processC2B(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c2bService.initiatePayment(params);
        });
    }
    // B2C methods
    processB2C(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.b2cService.makePayout(params);
        });
    }
    // B2B methods
    processB2B(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.b2bService.initiatePayment(params);
        });
    }
}
const sasaPay = new SasaPay({
    clientId: process.env.CLIENT_ID, // or pass directly
    clientSecret: process.env.CLIENT_SECRET, // or pass directly
    environment: process.env.ENVIRONMENT, // or pass directly
});
exports.default = sasaPay;
