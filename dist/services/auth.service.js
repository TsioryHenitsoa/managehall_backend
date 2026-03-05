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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = __importStar(require("./user.service"));
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const JWT_EXPIRES_IN = '1d';
const buildToken = (user) => {
    return jsonwebtoken_1.default.sign({
        sub: user.id,
        email: user.email,
        name: user.name
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
const signup = async (email, name, password) => {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
        throw new Error('EMAIL_ALREADY_EXISTS');
    }
    const user = await userService.signup(email, name, password);
    const token = buildToken(user);
    return { user, token };
};
exports.signup = signup;
const login = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('INVALID_CREDENTIALS');
    }
    const token = buildToken({ id: user.id, email: user.email, name: user.name });
    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
        token
    };
};
exports.login = login;
