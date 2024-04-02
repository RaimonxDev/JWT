import express from "express";
import { createNewUserController, getAllUserController } from '../../src/controllers/usersController.js';
import { validateNewUser } from '../../middlewares/validaNewUser.js';
import { isLogin } from "../../middlewares/validateLogin.js";

const router = express.Router();

router.post("/", validateNewUser, createNewUserController)
router.get("/", isLogin, getAllUserController)

export default router;