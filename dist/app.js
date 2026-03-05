"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const salle_routes_1 = __importDefault(require("./routes/salle.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => res.json({ message: 'Hello World!' }));
app.use('/auth', auth_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/salles', salle_routes_1.default);
exports.default = app;
