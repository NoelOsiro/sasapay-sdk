import AuthService from "./services/auth";
import C2BService from "./services/c2b";
import B2CService from "./services/b2c";
import B2BService from "./services/b2b";
import { CONFIG } from "./config";

const authService = new AuthService({
  clientId: CONFIG.clientId,
  clientSecret: CONFIG.clientSecret,
  baseUrl: CONFIG.baseUrl,
});

const c2bService = new C2BService(CONFIG.baseUrl, authService);
const b2cService = new B2CService(CONFIG.baseUrl, authService);
const b2bService = new B2BService(CONFIG.baseUrl, authService);

export { authService, c2bService, b2cService, b2bService };
