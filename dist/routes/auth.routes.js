"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/signup', async (req, res) => {
    const controller = new auth_controller_1.AuthController();
    try {
        const result = await controller.signup(req.body);
        const status = controller.getStatus() || 201;
        return res.status(status).json(result);
    }
    catch (err) {
        const status = controller.getStatus() || 500;
        const error = err instanceof Error ? err.message : 'Internal Server Error';
        return res.status(status).json({ error });
    }
});
router.post('/login', async (req, res) => {
    const controller = new auth_controller_1.AuthController();
    try {
        const result = await controller.login(req.body);
        const status = controller.getStatus() || 200;
        return res.status(status).json(result);
    }
    catch (err) {
        const status = controller.getStatus() || 500;
        const error = err instanceof Error ? err.message : 'Internal Server Error';
        return res.status(status).json({ error });
    }
});
exports.default = router;
