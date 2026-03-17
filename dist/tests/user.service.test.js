"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const prisma_1 = require("../prisma");
jest.mock('../prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(),
            findMany: jest.fn(),
        },
    },
}));
describe('User Service', () => {
    it('should create a user with hashed password', async () => {
        const mockUser = { id: '1', email: 'test@example.com', name: 'Test User', role: 'USER' };
        prisma_1.prisma.user.create.mockResolvedValue(mockUser);
        const result = await (0, user_service_1.createUser)('test@example.com', 'Test User', 'plain-password');
        expect(result).toEqual(mockUser);
        expect(prisma_1.prisma.user.create).toHaveBeenCalledWith({
            data: {
                email: 'test@example.com',
                name: 'Test User',
                password: expect.any(String),
                role: 'USER',
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
    });
    it('should get all users', async () => {
        const mockUsers = [
            { id: '1', email: 'test1@example.com', name: 'Test User 1', role: 'USER' },
            { id: '2', email: 'test2@example.com', name: 'Test User 2', role: 'ADMIN' },
        ];
        prisma_1.prisma.user.findMany.mockResolvedValue(mockUsers);
        const result = await (0, user_service_1.getAllUsers)();
        expect(result).toEqual(mockUsers);
        expect(prisma_1.prisma.user.findMany).toHaveBeenCalledWith({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
    });
});
