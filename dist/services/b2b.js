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
class B2BService {
    constructor(baseUrl, authService) {
        this.baseUrl = baseUrl;
        this.authService = authService;
    }
    /**
     * Initiate a B2B payment
     */
    initiatePayment(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.authService.getToken();
            const response = yield axios_1.default.post(`${this.baseUrl}/b2b/payment`, request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        });
    }
    /**
     * Get the status of a B2B payment transaction
     */
    getPaymentStatus(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.authService.getToken();
            const response = yield axios_1.default.get(`${this.baseUrl}/b2b/payment/status/${transactionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        });
    }
}
exports.default = B2BService;
