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
exports.SalleController = void 0;
const tsoa_1 = require("tsoa");
const salleService = __importStar(require("../services/salle.service"));
let SalleController = class SalleController extends tsoa_1.Controller {
    async getSalles(type, building) {
        return salleService.getAllSalles({ type, building });
    }
    async getAvailableSalles(start, end) {
        return salleService.getAvailableSalles(start, end);
    }
    async getSalleById(id) {
        return salleService.getSalleById(id);
    }
    async getAvailability(id, date) {
        return salleService.getAvailableSlots(id, date);
    }
    async createSalle(body) {
        this.setStatus(201);
        return salleService.createSalle(body);
    }
    async updateSalle(id, body) {
        return salleService.updateSalle(id, body);
    }
    async deleteSalle(id) {
        await salleService.deleteSalle(id);
        this.setStatus(204);
    }
};
exports.SalleController = SalleController;
__decorate([
    (0, tsoa_1.Get)('/'),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SalleController.prototype, "getSalles", null);
__decorate([
    (0, tsoa_1.Get)('disponibles'),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SalleController.prototype, "getAvailableSalles", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalleController.prototype, "getSalleById", null);
__decorate([
    (0, tsoa_1.Get)('{id}/disponibilites'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SalleController.prototype, "getAvailability", null);
__decorate([
    (0, tsoa_1.Post)('/'),
    (0, tsoa_1.Security)('jwt', ['ADMIN']),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalleController.prototype, "createSalle", null);
__decorate([
    (0, tsoa_1.Put)('{id}'),
    (0, tsoa_1.Security)('jwt', ['ADMIN']),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SalleController.prototype, "updateSalle", null);
__decorate([
    (0, tsoa_1.Delete)('{id}'),
    (0, tsoa_1.Security)('jwt', ['ADMIN']),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalleController.prototype, "deleteSalle", null);
exports.SalleController = SalleController = __decorate([
    (0, tsoa_1.Route)('salles'),
    (0, tsoa_1.Tags)('Salle')
], SalleController);
