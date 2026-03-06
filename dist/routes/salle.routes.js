"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salle_controller_1 = require("../controllers/salle.controller");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const controller = new salle_controller_1.SalleController();
    const salles = await controller.getSalles();
    return res.status(200).json(salles);
});
router.get('/:id', async (req, res) => {
    const controller = new salle_controller_1.SalleController();
    try {
        const salle = await controller.getSalleById(req.params.id);
        return res.status(200).json(salle);
    }
    catch (err) {
        const error = err instanceof Error ? err.message : 'Internal Server Error';
        return res.status(404).json({ error });
    }
});
router.post('/', async (req, res) => {
    const controller = new salle_controller_1.SalleController();
    const created = await controller.createSalle(req.body);
    return res.status(201).json(created);
});
router.put('/:id', async (req, res) => {
    const controller = new salle_controller_1.SalleController();
    try {
        const updated = await controller.updateSalle(req.params.id, req.body);
        return res.status(200).json(updated);
    }
    catch (err) {
        const error = err instanceof Error ? err.message : 'Internal Server Error';
        return res.status(404).json({ error });
    }
});
router.delete('/:id', async (req, res) => {
    const controller = new salle_controller_1.SalleController();
    try {
        await controller.deleteSalle(req.params.id);
        return res.status(204).send();
    }
    catch (err) {
        const error = err instanceof Error ? err.message : 'Internal Server Error';
        return res.status(404).json({ error });
    }
});
exports.default = router;
