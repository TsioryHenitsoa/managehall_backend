"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const prisma_1 = require("../prisma");
// On dit à Jest de mocker Prisma
jest.mock('../prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(),
            findMany: jest.fn()
        }
    }
}));
describe('User Service', () => {
    it('should signup a user with hashed password', async () => {
        // Arrange : ce que Prisma doit retourner
        const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
        prisma_1.prisma.user.create.mockResolvedValue(mockUser);
        // Act : on appelle la fonction à tester
        const result = await (0, user_service_1.signup)('test@example.com', 'Test User', 'plain-password');
        // Assert : vérifier que le résultat est correct
        expect(result).toEqual(mockUser);
        expect(prisma_1.prisma.user.create).toHaveBeenCalledWith({
            data: {
                email: 'test@example.com',
                name: 'Test User',
                password: expect.any(String)
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        });
    });
    it('should get all users', async () => {
        // Arrange : ce que Prisma doit retourner
        const mockUsers = [
            { id: 1, email: 'test1@example.com', name: 'Test User 1' },
            { id: 2, email: 'test2@example.com', name: 'Test User 2' }
        ];
        prisma_1.prisma.user.findMany.mockResolvedValue(mockUsers);
        // Act : on appelle la fonction à tester
        const result = await (0, user_service_1.getAllUsers)();
        // Assert : vérifier que le résultat est correct
        expect(result).toEqual(mockUsers);
        expect(prisma_1.prisma.user.findMany).toHaveBeenCalledWith({
            select: {
                id: true,
                email: true,
                name: true
            }
        });
    });
});
