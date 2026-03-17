"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmail = exports.createUser = exports.getAllUsers = void 0;
const prisma_1 = require("../prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = 10;
const getAllUsers = async () => {
    return prisma_1.prisma.user.findMany({
        select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
};
exports.getAllUsers = getAllUsers;
const createUser = async (email, name, password, role = 'USER') => {
    const hashedPassword = await bcryptjs_1.default.hash(password, SALT_ROUNDS);
    return prisma_1.prisma.user.create({
        data: { email, name, password: hashedPassword, role },
        select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
};
exports.createUser = createUser;
const getUserByEmail = async (email) => {
    return prisma_1.prisma.user.findUnique({ where: { email } });
};
exports.getUserByEmail = getUserByEmail;
const getUserById = async (id) => {
    return prisma_1.prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
};
exports.getUserById = getUserById;
