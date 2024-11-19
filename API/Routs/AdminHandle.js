import { Router } from "express";
import {
  addNewBrand,
  addNewCategory,
  addNewProduct,
  CountHeaderData,
  deleteProduct,
  displayAllProduct,
  searchProduct,
  updateProduct,
} from "../Controllers/adminCrudController.js";
import { validateToken } from "../Utils/jwt_validation.js";

const adminRouter = Router();
// adminRouter.use(validateToken);

adminRouter.post("/addNewBrand", addNewBrand);
adminRouter.post("/addNewCategory", addNewCategory);
adminRouter.get("/getAllProduct", displayAllProduct);
adminRouter.post("/searchProduct", searchProduct);
adminRouter.post("/addNewProduct", addNewProduct);
adminRouter.put("/updateProduct", updateProduct);
adminRouter.put("/deleteProduct", deleteProduct);
adminRouter.get('/productHead', CountHeaderData)
export default adminRouter;
