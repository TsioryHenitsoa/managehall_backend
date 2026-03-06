"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservation_controller_1 = require("../controllers/reservation.controller");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    const controller = new reservation_controller_1.ReservationController();
    try {
        const reservation = await controller.createReservation(req.body);
        return res.status(201).json(reservation);
    }
    catch (err) {
        const error = err instanceof Error ? err.message : 'Internal Server Error';
        return res.status(500).json({ error });
    }
});
exports.default = router;
