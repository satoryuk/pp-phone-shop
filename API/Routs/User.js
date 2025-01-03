import { Router } from "express";
import { checkout } from "../Controllers/user/Order.js";
import { getUserInformation } from "../Controllers/user/user.js";

const userRouter = Router();

userRouter.get('/checkout', checkout)
userRouter.get('/userInfo', getUserInformation)

export default userRouter;