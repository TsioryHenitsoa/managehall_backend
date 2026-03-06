"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const authService = __importStar(require("../services/auth.service"));
let AuthController = class AuthController extends tsoa_1.Controller {
    async signup(body) {
        const { email, name, password } = body;
        if (!email || !name || !password) {
            this.setStatus(400);
            throw new Error('email, name and password are required');
        }
        try {
            const result = await authService.signup(email, name, password);
            this.setStatus(201);
            return result;
        }
        catch (err) {
            if (err instanceof Error && err.message === 'EMAIL_ALREADY_EXISTS') {
                this.setStatus(409);
                throw new Error('Email already exists');
            }
            this.setStatus(500);
            throw new Error('Internal Server Error');
        }
    }
    async login(body) {
        const { email, password } = body;
        if (!email || !password) {
            this.setStatus(400);
            throw new Error('email and password are required');
        }
        try {
            const result = await authService.login(email, password);
            this.setStatus(200);
            return result;
        }
        catch (err) {
            if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
                this.setStatus(401);
                throw new Error('Invalid credentials');
            }
            this.setStatus(500);
            throw new Error('Internal Server Error');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Post)('signup'),
    (0, tsoa_1.Response)(400, 'email, name and password are required'),
    (0, tsoa_1.Response)(409, 'Email already exists'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, tsoa_1.Post)('login'),
    (0, tsoa_1.Response)(400, 'email and password are required'),
    (0, tsoa_1.Response)(401, 'Invalid credentials'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)('auth'),
    (0, tsoa_1.Tags)('Auth')
], AuthController);
