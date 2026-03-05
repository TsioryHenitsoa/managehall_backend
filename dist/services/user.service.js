"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.signup = exports.getAllUsers = void 0;
const prisma_1 = require("../prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = 10;
const getAllUsers = async () => {
    return await prisma_1.prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true
        }
    });
};
exports.getAllUsers = getAllUsers;
const signup = async (email, name, password) => {
    const hashedPassword = await bcryptjs_1.default.hash(password, SALT_ROUNDS);
    return await prisma_1.prisma.user.create({
        data: { email, name, password: hashedPassword },
        select: {
            id: true,
            email: true,
            name: true
        }
    });
};
exports.signup = signup;
const getUserByEmail = async (email) => {
    return await prisma_1.prisma.user.findUnique({
        where: { email }
    });
};
exports.getUserByEmail = getUserByEmail;
