"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const tsoa_1 = require("tsoa");
const reservationService = __importStar(require("../services/reservation.service"));
let ReservationController = class ReservationController extends tsoa_1.Controller {
    async getReservations(req) {
        const user = req.user;
        return reservationService.getAllReservations(user.sub, user.role);
    }
    async getReservationById(id) {
        return reservationService.getReservationById(id);
    }
    async createReservation(req, body) {
        const user = req.user;
        this.setStatus(201);
        return reservationService.createReservation({
            userId: user.sub,
            role: user.role,
            salleId: body.salleId,
            startTime: body.startTime,
            endTime: body.endTime,
            note: body.note,
            customPricePerHour: body.customPricePerHour,
        });
    }
    async updateReservation(req, id, body) {
        const user = req.user;
        return reservationService.updateReservation(id, user.sub, user.role, body);
    }
    async cancelReservation(req, id) {
        const user = req.user;
        return reservationService.cancelReservation(id, user.sub, user.role);
    }
    async recalibratePriceSnapshots(req, body) {
        const user = req.user;
        return reservationService.recalibrateReservationPriceSnapshots({
            actorUserId: user.sub,
            strategy: body.strategy,
            dryRun: body.dryRun,
            limit: body.limit,
        });
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, tsoa_1.Get)('/'),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservations", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservationById", null);
__decorate([
    (0, tsoa_1.Post)('/'),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "createReservation", null);
__decorate([
    (0, tsoa_1.Put)('{id}'),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "updateReservation", null);
__decorate([
    (0, tsoa_1.Patch)('{id}/cancel'),
    (0, tsoa_1.Security)('jwt'),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "cancelReservation", null);
__decorate([
    (0, tsoa_1.Post)('admin/recalibrate-price-snapshots'),
    (0, tsoa_1.Security)('jwt', ['ADMIN']),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "recalibratePriceSnapshots", null);
exports.ReservationController = ReservationController = __decorate([
    (0, tsoa_1.Route)('reservations'),
    (0, tsoa_1.Tags)('Reservation')
], ReservationController);
