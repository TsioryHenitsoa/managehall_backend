"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSalle = exports.deleteSalle = exports.getSalleById = exports.createSalle = exports.getAllSalles = void 0;
const prisma_1 = require("../prisma");
const getAllSalles = async () => {
    return await prisma_1.prisma.salle.findMany();
};
exports.getAllSalles = getAllSalles;
const createSalle = async (label, description, capacity, locationPrice) => {
    return await prisma_1.prisma.salle.create({
        data: { label, description, capacity, locationPrice }
    });
};
exports.createSalle = createSalle;
const getSalleById = async (id) => {
    return await prisma_1.prisma.salle.findUniqueOrThrow({
        where: { id }
    });
};
exports.getSalleById = getSalleById;
const deleteSalle = async (id) => {
    return await prisma_1.prisma.salle.delete({
        where: { id }
    });
};
exports.deleteSalle = deleteSalle;
const updateSalle = async (id, label, description, capacity, locationPrice) => {
    return await prisma_1.prisma.salle.update({
        where: { id },
        data: { label, description, capacity, locationPrice }
    });
};
exports.updateSalle = updateSalle;
