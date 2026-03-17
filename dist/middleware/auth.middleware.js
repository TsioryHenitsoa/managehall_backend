"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = expressAuthentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
function expressAuthentication(request, securityName, scopes) {
    if (securityName === 'jwt') {
        const authHeader = request.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
        if (!token) {
            return Promise.reject(new Error('No token provided'));
        }
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
                if (err)
                    return reject(new Error('Invalid or expired token'));
                // Check role-based scopes if provided
                if (scopes?.length && !scopes.includes(decoded.role)) {
                    return reject(new Error('Insufficient permissions'));
                }
                resolve(decoded);
            });
        });
    }
    return Promise.reject(new Error('Unknown security scheme'));
}
