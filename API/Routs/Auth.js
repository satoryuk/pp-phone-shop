import { Router } from "express";
import { handlelogin, register } from "../Controllers/authUserController.js";
import { adminLogin } from "../Controllers/authAdminController.js";

const AuthRouter = Router();

AuthRouter.post("/login", handlelogin);
AuthRouter.post("/register", register);
AuthRouter.post("/adminLogin", adminLogin);
export default AuthRouter;
