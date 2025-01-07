import { Router } from "express";
import { offerDisplay, offerDisplayByID, offerDisplayByName } from "../Controllers/common/offer.js";
import { category, displayAllProduct, displayAllProductByName, displayByCategory, getOneItemBySpecID, getProduct, searchItems, searchItemsByName } from "../Controllers/common/product.js";
import { displayByDate } from "../Controllers/adminCrud/DashBoard.js";
import { getNotification } from "../Controllers/common/notification.js";


const commonRouter = Router();

commonRouter.get('/offerDisplay', offerDisplay);
commonRouter.get('/offerDisplayByName', offerDisplayByName);
commonRouter.get('/offerDisplayByID/:id', offerDisplayByID);
commonRouter.get("/getAllProduct", displayAllProduct);
commonRouter.get("/getAllProductByName", displayAllProductByName);
commonRouter.get("/searchProduct", searchItems);
commonRouter.get("/searchProductByName", searchItemsByName);
commonRouter.get("/getProduct", getProduct)
commonRouter.get("/getAllProductbyCategory", displayByCategory);
commonRouter.get("/getAllProductbydate", displayByDate);
commonRouter.get("/getOneItemBySpecID", getOneItemBySpecID);
commonRouter.get('/category', category);
//Notification route
commonRouter.get("/notification", getNotification);
export default commonRouter;