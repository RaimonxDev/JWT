import express from "express";
import cors from "cors";
import { logger } from "logger-express";


import loginRoutes from "./config/routes/loginRoutes.js";
import userRoutes from './config/routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger());
app.use("/usuarios", userRoutes);
app.use("/login", loginRoutes);

app.listen(PORT, console.log(`Server UP: ${PORT}`));