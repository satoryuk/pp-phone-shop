import { Router } from "express";
import { checkout } from "../Controllers/user/Order.js";
import { getOrderByName, getUserInformation } from "../Controllers/user/user.js";
import { validateToken_refresh_token } from "../Utils/jwt_validation_refresh_token.js";

const userRouter = Router();
userRouter.use(validateToken_refresh_token);
userRouter.get('/checkout', checkout)
userRouter.get('/userInfo', getUserInformation)
userRouter.get('/orderByName', getOrderByName)
export default userRouter;