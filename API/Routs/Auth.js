import { Router } from "express";
import { adminLogin, adminRegister } from "../Controllers/auth/authAdminController.js"
import { handlelogin, logout } from "../Controllers/auth/authUserController.js";

const AuthRouter = Router();

AuthRouter.post("/login", handlelogin);
AuthRouter.post("/register", adminRegister);
AuthRouter.post("/adminLogin", adminLogin);
AuthRouter.post("/adminRegister", adminRegister);
AuthRouter.post("/adminLogout", logout);
export default AuthRouter;
