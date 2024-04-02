import express from "express";
import { loginUser } from '../../src/controllers/loginController.js';
import { validateLogin } from "../../middlewares/validateLogin.js";
const router = express.Router();
router.post("/", validateLogin, loginUser);
export default router;