import { fake_notification } from "../../db/fake_db.js";

// get Notification from fake db
export const getNotification = async (req, res) => {
    return res.status(200).json({
        message: "successfully",
        data: fake_notification
    });
}; 
