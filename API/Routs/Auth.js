import { Router } from "express";
import { handlelogin, logout, register } from "../Controllers/authUserController.js";
import { adminLogin } from "../Controllers/admin/authAdminController.js";

const AuthRouter = Router();

AuthRouter.post("/login", handlelogin);
AuthRouter.post("/register", register);
AuthRouter.post("/adminLogin", adminLogin);
AuthRouter.post("/adminLogout", logout);
export default AuthRouter;
