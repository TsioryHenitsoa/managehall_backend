"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const globals_1 = require("@jest/globals");
const prisma_1 = require("../prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
jest.mock('../prisma', () => ({
    prisma: {
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn()
        },
        $disconnect: jest.fn()
    }
}));
(0, globals_1.describe)('User API', () => {
    (0, globals_1.it)('GET /users should return 200', async () => {
        ;
        prisma_1.prisma.user.findMany.mockResolvedValue([{ id: '1', email: 'test@example.com', name: 'Test' }]);
        const res = await (0, supertest_1.default)(app_1.default).get('/users');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(Array.isArray(res.body)).toBe(true);
    });
    (0, globals_1.it)('POST /auth/signup should create a user and return a token', async () => {
        ;
        prisma_1.prisma.user.findUnique.mockResolvedValue(null);
        prisma_1.prisma.user.create.mockResolvedValue({
            id: 'user-1',
            email: 'signup@example.com',
            name: 'Test User'
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/auth/signup')
            .send({ email: 'signup@example.com', name: 'Test User', password: 'Secret123!' });
        (0, globals_1.expect)(res.statusCode).toBe(201);
        (0, globals_1.expect)(res.body).toHaveProperty('token');
        (0, globals_1.expect)(res.body).toHaveProperty('user');
        (0, globals_1.expect)(res.body.user).toHaveProperty('email');
        (0, globals_1.expect)(res.body.user).not.toHaveProperty('password');
    });
    (0, globals_1.it)('POST /auth/login should authenticate and return a token', async () => {
        const uniqueEmail = 'login@example.com';
        const password = 'Secret123!';
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        prisma_1.prisma.user.findUnique.mockResolvedValue({
            id: 'user-2',
            email: uniqueEmail,
            name: 'Login User',
            password: hashedPassword
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/auth/login')
            .send({ email: uniqueEmail, password });
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(res.body).toHaveProperty('token');
        (0, globals_1.expect)(res.body).toHaveProperty('user');
        (0, globals_1.expect)(res.body.user).toHaveProperty('email', uniqueEmail);
    });
});
afterAll(async () => {
    await prisma_1.prisma.$disconnect();
});
