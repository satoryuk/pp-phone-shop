import { Router } from "express";
import { addNewBrand, addNewCategory, addNewProduct, deleteProduct, displayAllProduct, searchProduct, updateProduct } from "../Controllers/adminCrudController.js";

const adminRouter=Router();

adminRouter.post('/addNewBrand',addNewBrand);
adminRouter.post('/addNewCategory',addNewCategory);
adminRouter.get("/getAllProduct",displayAllProduct)
adminRouter.post("/searchProduct",searchProduct);
adminRouter.post("/addNewProduct",addNewProduct);
adminRouter.put("/updateProduct",updateProduct);
adminRouter.put("/deleteProduct",deleteProduct);
export default adminRouter;