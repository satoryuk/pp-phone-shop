import { Router } from "express";
import { validateToken_refresh_token } from "../Utils/jwt_validation_refresh_token.js";
import upload from "../Utils/handleimg.js";
import { addNewBrand, addNewCategory, addNewProduct, deleteProduct, updateProduct } from "../Controllers/admin/adminCrudController.js";
import { category, CountHeaderData, displayAllProduct, displayByCategory, searchItems } from "../Controllers/admin/Product.js";
import { dashboardHeader, dashboardHeaderAll, displayByDate } from "../Controllers/admin/DashBoard.js";
import { OrderTable } from "../Controllers/admin/Order.js";

const adminRouter = Router();
adminRouter.use(validateToken_refresh_token);

adminRouter.post("/addNewBrand", upload.single('images'), addNewBrand);
adminRouter.post("/addNewCategory", addNewCategory);
adminRouter.get("/getAllProduct", displayAllProduct);
adminRouter.get("/getAllProductbydate", displayByDate);
adminRouter.get("/getAllProductbyCategory", displayByCategory);
adminRouter.get("/searchProduct", searchItems);
adminRouter.post("/addNewProduct", upload.array("images", 10), addNewProduct);
adminRouter.put("/updateProduct", updateProduct);
adminRouter.delete("/deleteProduct", deleteProduct);
adminRouter.get('/productHead', CountHeaderData)
adminRouter.get('/dashboardHead', dashboardHeader);
adminRouter.get('/dashboardHeadAll', dashboardHeaderAll);
adminRouter.get('/category', category);
adminRouter.get('/tableOrder', OrderTable);
export default adminRouter;
