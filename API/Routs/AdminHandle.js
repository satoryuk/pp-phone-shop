import { Router } from "express";
import {
  addNewBrand,
  addNewCategory,
  addNewProduct,
  category,
  CountHeaderData,
  dashboardHeader,
  dashboardHeaderAll,
  deleteProduct,
  displayAllProduct,
  displayByCategory,
  displayByDate,
  searchItems,
  updateProduct,
} from "../Controllers/admin/adminCrudController.js";
import { validateToken } from "../Utils/jwt_validation.js";
import upload from "../Utils/handleimg.js";

const adminRouter = Router();
// adminRouter.use(validateToken);

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
export default adminRouter;
