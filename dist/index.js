"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2bService = exports.b2cService = exports.c2bService = exports.authService = void 0;
const auth_1 = __importDefault(require("./services/auth"));
const c2b_1 = __importDefault(require("./services/c2b"));
const b2c_1 = __importDefault(require("./services/b2c"));
const b2b_1 = __importDefault(require("./services/b2b"));
const config_1 = require("./config");
const authService = new auth_1.default({
    clientId: config_1.CONFIG.clientId,
    clientSecret: config_1.CONFIG.clientSecret,
    baseUrl: config_1.CONFIG.baseUrl,
});
exports.authService = authService;
const c2bService = new c2b_1.default(config_1.CONFIG.baseUrl, authService);
exports.c2bService = c2bService;
const b2cService = new b2c_1.default(config_1.CONFIG.baseUrl, authService);
exports.b2cService = b2cService;
const b2bService = new b2b_1.default(config_1.CONFIG.baseUrl, authService);
exports.b2bService = b2bService;
