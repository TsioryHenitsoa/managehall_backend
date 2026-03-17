"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger/swagger.json"));
const routes_1 = require("./routes_generated/routes");
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
}));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
(0, routes_1.RegisterRoutes)(app);
app.get('/', (_req, res) => res.json({ message: 'Hall Backend API' }));
// Global error handler — must be registered after routes
app.use(error_middleware_1.errorHandler);
exports.default = app;
