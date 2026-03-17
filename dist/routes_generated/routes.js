"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const user_controller_1 = require("./../controllers/user.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const salle_controller_1 = require("./../controllers/salle.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const reservation_controller_1 = require("./../controllers/reservation.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const payment_controller_1 = require("./../controllers/payment.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const auth_controller_1 = require("./../controllers/auth.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const analytics_controller_1 = require("./../controllers/analytics.controller");
const auth_middleware_1 = require("./../middleware/auth.middleware");
const expressAuthenticationRecasted = auth_middleware_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UserResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "role": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SalleResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "label": { "dataType": "string", "required": true },
            "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "capacity": { "dataType": "double", "required": true },
            "pricePerHour": { "dataType": "double", "required": true },
            "building": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true },
            "isActive": { "dataType": "boolean", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailabilityResponse": {
        "dataType": "refObject",
        "properties": {
            "date": { "dataType": "string", "required": true },
            "salleId": { "dataType": "string", "required": true },
            "reservations": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "end": { "dataType": "string", "required": true }, "start": { "dataType": "string", "required": true } } }, "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateSalleBody": {
        "dataType": "refObject",
        "properties": {
            "label": { "dataType": "string", "required": true },
            "description": { "dataType": "string" },
            "capacity": { "dataType": "double", "required": true },
            "pricePerHour": { "dataType": "double", "required": true },
            "building": { "dataType": "string" },
            "type": { "dataType": "string" },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateSalleBody": {
        "dataType": "refObject",
        "properties": {
            "label": { "dataType": "string" },
            "description": { "dataType": "string" },
            "capacity": { "dataType": "double" },
            "pricePerHour": { "dataType": "double" },
            "building": { "dataType": "string" },
            "type": { "dataType": "string" },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateReservationBody": {
        "dataType": "refObject",
        "properties": {
            "salleId": { "dataType": "string", "required": true },
            "startTime": { "dataType": "string", "required": true },
            "endTime": { "dataType": "string", "required": true },
            "note": { "dataType": "string" },
            "customPricePerHour": { "dataType": "double" },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateReservationBody": {
        "dataType": "refObject",
        "properties": {
            "startTime": { "dataType": "string" },
            "endTime": { "dataType": "string" },
            "note": { "dataType": "string" },
            "customPricePerHour": { "dataType": "double" },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecalibrateSnapshotsBody": {
        "dataType": "refObject",
        "properties": {
            "strategy": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["from-total"] }, { "dataType": "enum", "enums": ["from-salle"] }] },
            "dryRun": { "dataType": "boolean" },
            "limit": { "dataType": "double" },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "reservationId": { "dataType": "string", "required": true },
            "amount": { "dataType": "double", "required": true },
            "method": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePaymentBody": {
        "dataType": "refObject",
        "properties": {
            "amount": { "dataType": "double", "required": true },
            "method": { "dataType": "string" },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentSummary": {
        "dataType": "refObject",
        "properties": {
            "reservationId": { "dataType": "string", "required": true },
            "totalAmount": { "dataType": "double", "required": true },
            "paidAmount": { "dataType": "double", "required": true },
            "remainingAmount": { "dataType": "double", "required": true },
            "payments": { "dataType": "array", "array": { "dataType": "refObject", "ref": "PaymentResponse" }, "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthUser": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "role": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthPayload": {
        "dataType": "refObject",
        "properties": {
            "user": { "ref": "AuthUser", "required": true },
            "token": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignupBody": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginBody": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SeriesPoint": {
        "dataType": "refObject",
        "properties": {
            "period": { "dataType": "string", "required": true },
            "value": { "dataType": "double", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "ignore", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUserController_getUsers = {};
    app.get('/users', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.getUsers)), async function UserController_getUsers(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUsers, request, response });
            const controller = new user_controller_1.UserController();
            await templateService.apiHandler({
                methodName: 'getUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_getMe = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/users/me', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.getMe)), async function UserController_getMe(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getMe, request, response });
            const controller = new user_controller_1.UserController();
            await templateService.apiHandler({
                methodName: 'getMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSalleController_getSalles = {
        type: { "in": "query", "name": "type", "dataType": "string" },
        building: { "in": "query", "name": "building", "dataType": "string" },
    };
    app.get('/salles', ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController)), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController.prototype.getSalles)), async function SalleController_getSalles(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_getSalles, request, response });
            const controller = new salle_controller_1.SalleController();
            await templateService.apiHandler({
                methodName: 'getSalles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSalleController_getAvailableSalles = {
        start: { "in": "query", "name": "start", "required": true, "dataType": "string" },
        end: { "in": "query", "name": "end", "required": true, "dataType": "string" },
    };
    app.get('/salles/disponibles', ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController)), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController.prototype.getAvailableSalles)), async function SalleController_getAvailableSalles(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_getAvailableSalles, request, response });
            const controller = new salle_controller_1.SalleController();
            await templateService.apiHandler({
                methodName: 'getAvailableSalles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSalleController_getSalleById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.get('/salles/:id', ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController)), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController.prototype.getSalleById)), async function SalleController_getSalleById(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_getSalleById, request, response });
            const controller = new salle_controller_1.SalleController();
            await templateService.apiHandler({
                methodName: 'getSalleById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSalleController_getAvailability = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        date: { "in": "query", "name": "date", "required": true, "dataType": "string" },
    };
    app.get('/salles/:id/disponibilites', ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController)), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController.prototype.getAvailability)), async function SalleController_getAvailability(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_getAvailability, request, response });
            const controller = new salle_controller_1.SalleController();
            await templateService.apiHandler({
                methodName: 'getAvailability',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSalleController_createSalle = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateSalleBody" },
    };
    app.post('/salles', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController)), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController.prototype.createSalle)), async function SalleController_createSalle(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_createSalle, request, response });
            const controller = new salle_controller_1.SalleController();
            await templateService.apiHandler({
                methodName: 'createSalle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSalleController_updateSalle = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdateSalleBody" },
    };
    app.put('/salles/:id', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController)), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController.prototype.updateSalle)), async function SalleController_updateSalle(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_updateSalle, request, response });
            const controller = new salle_controller_1.SalleController();
            await templateService.apiHandler({
                methodName: 'updateSalle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSalleController_deleteSalle = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.delete('/salles/:id', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController)), ...((0, runtime_1.fetchMiddlewares)(salle_controller_1.SalleController.prototype.deleteSalle)), async function SalleController_deleteSalle(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_deleteSalle, request, response });
            const controller = new salle_controller_1.SalleController();
            await templateService.apiHandler({
                methodName: 'deleteSalle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReservationController_getReservations = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/reservations', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController)), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController.prototype.getReservations)), async function ReservationController_getReservations(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_getReservations, request, response });
            const controller = new reservation_controller_1.ReservationController();
            await templateService.apiHandler({
                methodName: 'getReservations',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReservationController_getReservationById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.get('/reservations/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController)), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController.prototype.getReservationById)), async function ReservationController_getReservationById(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_getReservationById, request, response });
            const controller = new reservation_controller_1.ReservationController();
            await templateService.apiHandler({
                methodName: 'getReservationById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReservationController_createReservation = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateReservationBody" },
    };
    app.post('/reservations', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController)), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController.prototype.createReservation)), async function ReservationController_createReservation(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_createReservation, request, response });
            const controller = new reservation_controller_1.ReservationController();
            await templateService.apiHandler({
                methodName: 'createReservation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReservationController_updateReservation = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdateReservationBody" },
    };
    app.put('/reservations/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController)), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController.prototype.updateReservation)), async function ReservationController_updateReservation(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_updateReservation, request, response });
            const controller = new reservation_controller_1.ReservationController();
            await templateService.apiHandler({
                methodName: 'updateReservation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReservationController_cancelReservation = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
    };
    app.patch('/reservations/:id/cancel', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController)), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController.prototype.cancelReservation)), async function ReservationController_cancelReservation(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_cancelReservation, request, response });
            const controller = new reservation_controller_1.ReservationController();
            await templateService.apiHandler({
                methodName: 'cancelReservation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReservationController_recalibratePriceSnapshots = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        body: { "in": "body", "name": "body", "required": true, "ref": "RecalibrateSnapshotsBody" },
    };
    app.post('/reservations/admin/recalibrate-price-snapshots', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController)), ...((0, runtime_1.fetchMiddlewares)(reservation_controller_1.ReservationController.prototype.recalibratePriceSnapshots)), async function ReservationController_recalibratePriceSnapshots(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_recalibratePriceSnapshots, request, response });
            const controller = new reservation_controller_1.ReservationController();
            await templateService.apiHandler({
                methodName: 'recalibratePriceSnapshots',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsPaymentController_addPayment = {
        reservationId: { "in": "path", "name": "reservationId", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "CreatePaymentBody" },
    };
    app.post('/reservations/:reservationId/payments', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(payment_controller_1.PaymentController)), ...((0, runtime_1.fetchMiddlewares)(payment_controller_1.PaymentController.prototype.addPayment)), async function PaymentController_addPayment(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_addPayment, request, response });
            const controller = new payment_controller_1.PaymentController();
            await templateService.apiHandler({
                methodName: 'addPayment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsPaymentController_getPayments = {
        reservationId: { "in": "path", "name": "reservationId", "required": true, "dataType": "string" },
    };
    app.get('/reservations/:reservationId/payments', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(payment_controller_1.PaymentController)), ...((0, runtime_1.fetchMiddlewares)(payment_controller_1.PaymentController.prototype.getPayments)), async function PaymentController_getPayments(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_getPayments, request, response });
            const controller = new payment_controller_1.PaymentController();
            await templateService.apiHandler({
                methodName: 'getPayments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_signup = {
        body: { "in": "body", "name": "body", "required": true, "ref": "SignupBody" },
    };
    app.post('/auth/signup', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.signup)), async function AuthController_signup(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_signup, request, response });
            const controller = new auth_controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'signup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_login = {
        body: { "in": "body", "name": "body", "required": true, "ref": "LoginBody" },
    };
    app.post('/auth/login', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.login)), async function AuthController_login(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });
            const controller = new auth_controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAnalyticsController_getOverview = {
        from: { "in": "query", "name": "from", "dataType": "string" },
        to: { "in": "query", "name": "to", "dataType": "string" },
    };
    app.get('/analytics/overview', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController)), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController.prototype.getOverview)), async function AnalyticsController_getOverview(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getOverview, request, response });
            const controller = new analytics_controller_1.AnalyticsController();
            await templateService.apiHandler({
                methodName: 'getOverview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAnalyticsController_getReservationSeries = {
        granularity: { "in": "query", "name": "granularity", "dataType": "string" },
        from: { "in": "query", "name": "from", "dataType": "string" },
        to: { "in": "query", "name": "to", "dataType": "string" },
    };
    app.get('/analytics/reservations/series', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController)), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController.prototype.getReservationSeries)), async function AnalyticsController_getReservationSeries(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getReservationSeries, request, response });
            const controller = new analytics_controller_1.AnalyticsController();
            await templateService.apiHandler({
                methodName: 'getReservationSeries',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAnalyticsController_getRevenueSeries = {
        granularity: { "in": "query", "name": "granularity", "dataType": "string" },
        from: { "in": "query", "name": "from", "dataType": "string" },
        to: { "in": "query", "name": "to", "dataType": "string" },
    };
    app.get('/analytics/revenue/series', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController)), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController.prototype.getRevenueSeries)), async function AnalyticsController_getRevenueSeries(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getRevenueSeries, request, response });
            const controller = new analytics_controller_1.AnalyticsController();
            await templateService.apiHandler({
                methodName: 'getRevenueSeries',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAnalyticsController_getTopSalles = {
        limit: { "in": "query", "name": "limit", "dataType": "double" },
        from: { "in": "query", "name": "from", "dataType": "string" },
        to: { "in": "query", "name": "to", "dataType": "string" },
    };
    app.get('/analytics/salles/top', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController)), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController.prototype.getTopSalles)), async function AnalyticsController_getTopSalles(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getTopSalles, request, response });
            const controller = new analytics_controller_1.AnalyticsController();
            await templateService.apiHandler({
                methodName: 'getTopSalles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAnalyticsController_getPaymentMethods = {
        from: { "in": "query", "name": "from", "dataType": "string" },
        to: { "in": "query", "name": "to", "dataType": "string" },
    };
    app.get('/analytics/payments/methods', authenticateMiddleware([{ "jwt": ["ADMIN"] }]), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController)), ...((0, runtime_1.fetchMiddlewares)(analytics_controller_1.AnalyticsController.prototype.getPaymentMethods)), async function AnalyticsController_getPaymentMethods(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getPaymentMethods, request, response });
            const controller = new analytics_controller_1.AnalyticsController();
            await templateService.apiHandler({
                methodName: 'getPaymentMethods',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return async function runAuthenticationMiddleware(request, response, next) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts = [];
            const pushAndRethrow = (error) => {
                failedAttempts.push(error);
                throw error;
            };
            const secMethodOrPromises = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises = [];
                    for (const name in secMethod) {
                        secMethodAndPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                }
                else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                }
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            try {
                request['user'] = await Promise.any(secMethodOrPromises);
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next();
            }
            catch (err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
