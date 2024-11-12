import { Router } from "express";
import { addNewBrand, addNewCategory } from "../Controllers/adminController.js";

const adminRouter=Router();

adminRouter.post('/addNewBrand',addNewBrand);
adminRouter.post('/addNewCategory',addNewCategory);

export default adminRouter;