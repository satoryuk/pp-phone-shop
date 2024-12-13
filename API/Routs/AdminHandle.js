import { Router } from "express";
import upload from "../Utils/handleimg.js";
import { validateToken_refresh_token } from "../Utils/jwt_validation_refresh_token.js";
import { addNewBrand, addNewCategory, addNewProduct, CountHeaderData, deleteProduct, updateProduct } from "../Controllers/adminCrud/Product.js";
import { category } from "../Controllers/common/product.js";
import { dashboardHeader, dashboardHeaderAll } from "../Controllers/adminCrud/DashBoard.js"
import { deleteOrder, OrderTable, updateOrder } from "../Controllers/adminCrud/Order.js";

import { offerDelete, offerInsert, offerUpdate } from "../Controllers/adminCrud/Offer.js";
import { headerOrder } from "../Controllers/adminCrud/Order.js";


const adminRouter = Router();
adminRouter.use(validateToken_refresh_token);

adminRouter.post("/addNewBrand", upload.single('images'), addNewBrand);
adminRouter.post("/addNewCategory", addNewCategory);
adminRouter.post("/addNewProduct", upload.array("images", 10), addNewProduct);
adminRouter.put("/updateProduct/:productId", upload.array("images", 10), updateProduct);
adminRouter.delete("/deleteProduct", deleteProduct);
adminRouter.get('/productHead', CountHeaderData)
adminRouter.get('/dashboardHead', dashboardHeader);
adminRouter.get('/dashboardHeadAll', dashboardHeaderAll);
adminRouter.get('/category', category);
adminRouter.get('/tableOrder', OrderTable);
adminRouter.get('/headerOrder', headerOrder);
adminRouter.put('/UpdateOrder/:order_id', updateOrder);
adminRouter.delete('/deleleOrder/:DeleteOrderID', deleteOrder);
adminRouter.get('/offerInsert', offerInsert)
adminRouter.get('/offerUpdate/:offerID', offerUpdate)
adminRouter.delete('/offerDelete/:offerID', offerDelete)


export default adminRouter;