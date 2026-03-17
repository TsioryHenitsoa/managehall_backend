/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SalleController } from './../controllers/salle.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReservationController } from './../controllers/reservation.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PaymentController } from './../controllers/payment.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AnalyticsController } from './../controllers/analytics.controller';
import { expressAuthentication } from './../middleware/auth.middleware';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "role": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SalleResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "label": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "capacity": {"dataType":"double","required":true},
            "pricePerHour": {"dataType":"double","required":true},
            "building": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "isActive": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailabilityResponse": {
        "dataType": "refObject",
        "properties": {
            "date": {"dataType":"string","required":true},
            "salleId": {"dataType":"string","required":true},
            "reservations": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"end":{"dataType":"string","required":true},"start":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateSalleBody": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "capacity": {"dataType":"double","required":true},
            "pricePerHour": {"dataType":"double","required":true},
            "building": {"dataType":"string"},
            "type": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateSalleBody": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string"},
            "description": {"dataType":"string"},
            "capacity": {"dataType":"double"},
            "pricePerHour": {"dataType":"double"},
            "building": {"dataType":"string"},
            "type": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateReservationBody": {
        "dataType": "refObject",
        "properties": {
            "salleId": {"dataType":"string","required":true},
            "startTime": {"dataType":"string","required":true},
            "endTime": {"dataType":"string","required":true},
            "note": {"dataType":"string"},
            "customPricePerHour": {"dataType":"double"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateReservationBody": {
        "dataType": "refObject",
        "properties": {
            "startTime": {"dataType":"string"},
            "endTime": {"dataType":"string"},
            "note": {"dataType":"string"},
            "customPricePerHour": {"dataType":"double"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecalibrateSnapshotsBody": {
        "dataType": "refObject",
        "properties": {
            "strategy": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["from-total"]},{"dataType":"enum","enums":["from-salle"]}]},
            "dryRun": {"dataType":"boolean"},
            "limit": {"dataType":"double"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "reservationId": {"dataType":"string","required":true},
            "amount": {"dataType":"double","required":true},
            "method": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePaymentBody": {
        "dataType": "refObject",
        "properties": {
            "amount": {"dataType":"double","required":true},
            "method": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaymentSummary": {
        "dataType": "refObject",
        "properties": {
            "reservationId": {"dataType":"string","required":true},
            "totalAmount": {"dataType":"double","required":true},
            "paidAmount": {"dataType":"double","required":true},
            "remainingAmount": {"dataType":"double","required":true},
            "payments": {"dataType":"array","array":{"dataType":"refObject","ref":"PaymentResponse"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "role": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthPayload": {
        "dataType": "refObject",
        "properties": {
            "user": {"ref":"AuthUser","required":true},
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignupBody": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginBody": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SeriesPoint": {
        "dataType": "refObject",
        "properties": {
            "period": {"dataType":"string","required":true},
            "value": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_getUsers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUsers)),

            async function UserController_getUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUsers, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getMe: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/users/me',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getMe)),

            async function UserController_getMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getMe, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSalleController_getSalles: Record<string, TsoaRoute.ParameterSchema> = {
                type: {"in":"query","name":"type","dataType":"string"},
                building: {"in":"query","name":"building","dataType":"string"},
        };
        app.get('/salles',
            ...(fetchMiddlewares<RequestHandler>(SalleController)),
            ...(fetchMiddlewares<RequestHandler>(SalleController.prototype.getSalles)),

            async function SalleController_getSalles(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_getSalles, request, response });

                const controller = new SalleController();

              await templateService.apiHandler({
                methodName: 'getSalles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSalleController_getAvailableSalles: Record<string, TsoaRoute.ParameterSchema> = {
                start: {"in":"query","name":"start","required":true,"dataType":"string"},
                end: {"in":"query","name":"end","required":true,"dataType":"string"},
        };
        app.get('/salles/disponibles',
            ...(fetchMiddlewares<RequestHandler>(SalleController)),
            ...(fetchMiddlewares<RequestHandler>(SalleController.prototype.getAvailableSalles)),

            async function SalleController_getAvailableSalles(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_getAvailableSalles, request, response });

                const controller = new SalleController();

              await templateService.apiHandler({
                methodName: 'getAvailableSalles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSalleController_getSalleById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/salles/:id',
            ...(fetchMiddlewares<RequestHandler>(SalleController)),
            ...(fetchMiddlewares<RequestHandler>(SalleController.prototype.getSalleById)),

            async function SalleController_getSalleById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_getSalleById, request, response });

                const controller = new SalleController();

              await templateService.apiHandler({
                methodName: 'getSalleById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSalleController_getAvailability: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                date: {"in":"query","name":"date","required":true,"dataType":"string"},
        };
        app.get('/salles/:id/disponibilites',
            ...(fetchMiddlewares<RequestHandler>(SalleController)),
            ...(fetchMiddlewares<RequestHandler>(SalleController.prototype.getAvailability)),

            async function SalleController_getAvailability(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_getAvailability, request, response });

                const controller = new SalleController();

              await templateService.apiHandler({
                methodName: 'getAvailability',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSalleController_createSalle: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateSalleBody"},
        };
        app.post('/salles',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(SalleController)),
            ...(fetchMiddlewares<RequestHandler>(SalleController.prototype.createSalle)),

            async function SalleController_createSalle(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_createSalle, request, response });

                const controller = new SalleController();

              await templateService.apiHandler({
                methodName: 'createSalle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSalleController_updateSalle: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateSalleBody"},
        };
        app.put('/salles/:id',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(SalleController)),
            ...(fetchMiddlewares<RequestHandler>(SalleController.prototype.updateSalle)),

            async function SalleController_updateSalle(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_updateSalle, request, response });

                const controller = new SalleController();

              await templateService.apiHandler({
                methodName: 'updateSalle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSalleController_deleteSalle: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/salles/:id',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(SalleController)),
            ...(fetchMiddlewares<RequestHandler>(SalleController.prototype.deleteSalle)),

            async function SalleController_deleteSalle(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSalleController_deleteSalle, request, response });

                const controller = new SalleController();

              await templateService.apiHandler({
                methodName: 'deleteSalle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReservationController_getReservations: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/reservations',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReservationController)),
            ...(fetchMiddlewares<RequestHandler>(ReservationController.prototype.getReservations)),

            async function ReservationController_getReservations(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_getReservations, request, response });

                const controller = new ReservationController();

              await templateService.apiHandler({
                methodName: 'getReservations',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReservationController_getReservationById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/reservations/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReservationController)),
            ...(fetchMiddlewares<RequestHandler>(ReservationController.prototype.getReservationById)),

            async function ReservationController_getReservationById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_getReservationById, request, response });

                const controller = new ReservationController();

              await templateService.apiHandler({
                methodName: 'getReservationById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReservationController_createReservation: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateReservationBody"},
        };
        app.post('/reservations',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReservationController)),
            ...(fetchMiddlewares<RequestHandler>(ReservationController.prototype.createReservation)),

            async function ReservationController_createReservation(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_createReservation, request, response });

                const controller = new ReservationController();

              await templateService.apiHandler({
                methodName: 'createReservation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReservationController_updateReservation: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateReservationBody"},
        };
        app.put('/reservations/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReservationController)),
            ...(fetchMiddlewares<RequestHandler>(ReservationController.prototype.updateReservation)),

            async function ReservationController_updateReservation(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_updateReservation, request, response });

                const controller = new ReservationController();

              await templateService.apiHandler({
                methodName: 'updateReservation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReservationController_cancelReservation: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.patch('/reservations/:id/cancel',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ReservationController)),
            ...(fetchMiddlewares<RequestHandler>(ReservationController.prototype.cancelReservation)),

            async function ReservationController_cancelReservation(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_cancelReservation, request, response });

                const controller = new ReservationController();

              await templateService.apiHandler({
                methodName: 'cancelReservation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReservationController_recalibratePriceSnapshots: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"RecalibrateSnapshotsBody"},
        };
        app.post('/reservations/admin/recalibrate-price-snapshots',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(ReservationController)),
            ...(fetchMiddlewares<RequestHandler>(ReservationController.prototype.recalibratePriceSnapshots)),

            async function ReservationController_recalibratePriceSnapshots(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReservationController_recalibratePriceSnapshots, request, response });

                const controller = new ReservationController();

              await templateService.apiHandler({
                methodName: 'recalibratePriceSnapshots',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentController_addPayment: Record<string, TsoaRoute.ParameterSchema> = {
                reservationId: {"in":"path","name":"reservationId","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"CreatePaymentBody"},
        };
        app.post('/reservations/:reservationId/payments',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.addPayment)),

            async function PaymentController_addPayment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_addPayment, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'addPayment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentController_getPayments: Record<string, TsoaRoute.ParameterSchema> = {
                reservationId: {"in":"path","name":"reservationId","required":true,"dataType":"string"},
        };
        app.get('/reservations/:reservationId/payments',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getPayments)),

            async function PaymentController_getPayments(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_getPayments, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'getPayments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_signup: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"SignupBody"},
        };
        app.post('/auth/signup',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.signup)),

            async function AuthController_signup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_signup, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'signup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"LoginBody"},
        };
        app.post('/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAnalyticsController_getOverview: Record<string, TsoaRoute.ParameterSchema> = {
                from: {"in":"query","name":"from","dataType":"string"},
                to: {"in":"query","name":"to","dataType":"string"},
        };
        app.get('/analytics/overview',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController)),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController.prototype.getOverview)),

            async function AnalyticsController_getOverview(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getOverview, request, response });

                const controller = new AnalyticsController();

              await templateService.apiHandler({
                methodName: 'getOverview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAnalyticsController_getReservationSeries: Record<string, TsoaRoute.ParameterSchema> = {
                granularity: {"in":"query","name":"granularity","dataType":"string"},
                from: {"in":"query","name":"from","dataType":"string"},
                to: {"in":"query","name":"to","dataType":"string"},
        };
        app.get('/analytics/reservations/series',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController)),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController.prototype.getReservationSeries)),

            async function AnalyticsController_getReservationSeries(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getReservationSeries, request, response });

                const controller = new AnalyticsController();

              await templateService.apiHandler({
                methodName: 'getReservationSeries',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAnalyticsController_getRevenueSeries: Record<string, TsoaRoute.ParameterSchema> = {
                granularity: {"in":"query","name":"granularity","dataType":"string"},
                from: {"in":"query","name":"from","dataType":"string"},
                to: {"in":"query","name":"to","dataType":"string"},
        };
        app.get('/analytics/revenue/series',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController)),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController.prototype.getRevenueSeries)),

            async function AnalyticsController_getRevenueSeries(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getRevenueSeries, request, response });

                const controller = new AnalyticsController();

              await templateService.apiHandler({
                methodName: 'getRevenueSeries',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAnalyticsController_getTopSalles: Record<string, TsoaRoute.ParameterSchema> = {
                limit: {"in":"query","name":"limit","dataType":"double"},
                from: {"in":"query","name":"from","dataType":"string"},
                to: {"in":"query","name":"to","dataType":"string"},
        };
        app.get('/analytics/salles/top',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController)),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController.prototype.getTopSalles)),

            async function AnalyticsController_getTopSalles(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getTopSalles, request, response });

                const controller = new AnalyticsController();

              await templateService.apiHandler({
                methodName: 'getTopSalles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAnalyticsController_getPaymentMethods: Record<string, TsoaRoute.ParameterSchema> = {
                from: {"in":"query","name":"from","dataType":"string"},
                to: {"in":"query","name":"to","dataType":"string"},
        };
        app.get('/analytics/payments/methods',
            authenticateMiddleware([{"jwt":["ADMIN"]}]),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController)),
            ...(fetchMiddlewares<RequestHandler>(AnalyticsController.prototype.getPaymentMethods)),

            async function AnalyticsController_getPaymentMethods(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAnalyticsController_getPaymentMethods, request, response });

                const controller = new AnalyticsController();

              await templateService.apiHandler({
                methodName: 'getPaymentMethods',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
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
            catch(err) {
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
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
