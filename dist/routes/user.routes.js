"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const controller = new user_controller_1.UserController();
    try {
        const users = await controller.getUsers();
        const status = controller.getStatus() || 200;
        return res.status(status).json(users);
    }
    catch (err) {
        const status = controller.getStatus() || 500;
        const error = err instanceof Error ? err.message : 'Internal Server Error';
        return res.status(status).json({ error });
    }
});
exports.default = router;
