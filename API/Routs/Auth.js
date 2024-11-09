import { Router } from "express";
import { handlelogin, register } from "../Controllers/authController.js";

const AuthRout=Router();

AuthRout.post('/login',handlelogin);
AuthRout.post('/register',register);

export default AuthRout;