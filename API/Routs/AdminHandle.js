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
} from "../Controllers/adminCrudController.js";
import { validateToken } from "../Utils/jwt_validation.js";

const adminRouter = Router();
// adminRouter.use(validateToken);

adminRouter.post("/addNewBrand", addNewBrand);
adminRouter.post("/addNewCategory", addNewCategory);
adminRouter.get("/getAllProduct", displayAllProduct);
adminRouter.get("/getAllProductbydate", displayByDate);
adminRouter.get("/getAllProductbyCategory", displayByCategory);
adminRouter.get("/searchProduct", searchItems);
adminRouter.post("/addNewProduct", addNewProduct);
adminRouter.put("/updateProduct", updateProduct);
adminRouter.put("/deleteProduct", deleteProduct);
adminRouter.get('/productHead', CountHeaderData)
adminRouter.get('/dashboardHead', dashboardHeader);
adminRouter.get('/dashboardHeadAll', dashboardHeaderAll);
adminRouter.get('/category', category);
export default adminRouter;
