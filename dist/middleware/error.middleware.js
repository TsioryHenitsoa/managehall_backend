"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const errors_1 = require("../errors");
function errorHandler(err, _req, res, _next) {
    // TSOA validation errors
    if (err?.status === 422 || err?.fields) {
        res.status(422).json({
            status: 422,
            message: 'Validation failed',
            details: err.fields,
        });
        return;
    }
    // TSOA auth errors (from expressAuthentication)
    if (err?.message === 'No token provided' || err?.message === 'Invalid or expired token') {
        res.status(401).json({
            status: 401,
            message: err.message,
        });
        return;
    }
    if (err?.message === 'Insufficient permissions') {
        res.status(403).json({
            status: 403,
            message: err.message,
        });
        return;
    }
    // Custom AppError
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        });
        return;
    }
    // Prisma not found
    if (err?.code === 'P2025') {
        res.status(404).json({
            status: 404,
            message: 'Resource not found',
        });
        return;
    }
    // Prisma unique constraint
    if (err?.code === 'P2002') {
        res.status(409).json({
            status: 409,
            message: 'A record with this value already exists',
        });
        return;
    }
    // Fallback
    console.error('Unhandled error:', err);
    res.status(500).json({
        status: 500,
        message: 'Internal server error',
    });
}
