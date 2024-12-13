import { Router } from "express";
import { validateToken_refresh_token } from "../Utils/jwt_validation_refresh_token.js";
import upload from "../Utils/handleimg.js";
import { addNewBrand, addNewCategory, addNewProduct, deleteProduct, updateProduct } from "../Controllers/admin/adminCrudController.js";
import { category, CountHeaderData, displayAllProduct, displayByCategory, searchItems, searchItemsByID } from "../Controllers/admin/Product.js";
import { dashboardHeader, dashboardHeaderAll, displayByDate } from "../Controllers/admin/DashBoard.js";
import { OrderTable, updateOrder } from "../Controllers/admin/Order.js";
import { offerDelete, offerDisplay, offerInsert, offerUpdate } from "../Controllers/admin/Offer.js";

const adminRouter = Router();
adminRouter.use(validateToken_refresh_token);

adminRouter.post("/addNewBrand", upload.single('images'), addNewBrand);
adminRouter.post("/addNewCategory", addNewCategory);
adminRouter.get("/getAllProduct", displayAllProduct);
adminRouter.get("/getAllProductbydate", displayByDate);
adminRouter.get("/getAllProductbyCategory", displayByCategory);
adminRouter.get("/searchProduct", searchItems);
adminRouter.get("/searchProductByID/:id", searchItemsByID);
adminRouter.post("/addNewProduct", upload.array("images", 10), addNewProduct);
adminRouter.put("/updateProduct/:productId", upload.array("images", 10), updateProduct);
adminRouter.delete("/deleteProduct", deleteProduct);
adminRouter.get('/productHead', CountHeaderData)
adminRouter.get('/dashboardHead', dashboardHeader);
adminRouter.get('/dashboardHeadAll', dashboardHeaderAll);
adminRouter.get('/category', category);
adminRouter.get('/tableOrder', OrderTable);
adminRouter.put('/UpdateOrder/:order_id', updateOrder);
adminRouter.get('/offerDisplay', offerDisplay)
adminRouter.get('/offerInsert', offerInsert)
adminRouter.get('/offerUpdate/:offerID', offerUpdate)
adminRouter.get('/offerDelete/:offerID', offerDelete)


export default adminRouter;