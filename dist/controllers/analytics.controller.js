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
exports.AnalyticsController = void 0;
const tsoa_1 = require("tsoa");
const analyticsService = __importStar(require("../services/analytics.service"));
let AnalyticsController = class AnalyticsController extends tsoa_1.Controller {
    async getOverview(from, to) {
        return analyticsService.getOverview(from, to);
    }
    async getReservationSeries(granularity, from, to) {
        return analyticsService.getReservationSeries(granularity, from, to);
    }
    async getRevenueSeries(granularity, from, to) {
        return analyticsService.getRevenueSeries(granularity, from, to);
    }
    async getTopSalles(limit, from, to) {
        return analyticsService.getTopSalles(limit, from, to);
    }
    async getPaymentMethods(from, to) {
        return analyticsService.getPaymentMethods(from, to);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, tsoa_1.Get)('overview'),
    (0, tsoa_1.Security)('jwt', ['ADMIN']),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getOverview", null);
__decorate([
    (0, tsoa_1.Get)('reservations/series'),
    (0, tsoa_1.Security)('jwt', ['ADMIN']),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getReservationSeries", null);
__decorate([
    (0, tsoa_1.Get)('revenue/series'),
    (0, tsoa_1.Security)('jwt', ['ADMIN']),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getRevenueSeries", null);
__decorate([
    (0, tsoa_1.Get)('salles/top'),
    (0, tsoa_1.Security)('jwt', ['ADMIN']),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getTopSalles", null);
__decorate([
    (0, tsoa_1.Get)('payments/methods'),
    (0, tsoa_1.Security)('jwt', ['ADMIN']),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getPaymentMethods", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, tsoa_1.Route)('analytics'),
    (0, tsoa_1.Tags)('Analytics')
], AnalyticsController);
