import pool from "../../db/db_handle.js";

export const offerDisplay = async (req, res) => {
    const query = `SELECT * FROM promotions pm
                    INNER JOIN phones p ON
                    p.phone_id=pm.phone_id
                    `
    pool.promise().query(query)
        .then(([offer]) => {
            res.status(200).json({
                message: "successfully",
                data: offer
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                message: "something went wrong "
            })

        })
}
export const offerInsert = async (req, res) => {
    const { phone_name, promo_name, discount_percent, start_date, end_date } = req.body;

    // Check if phone_name is provided
    if (!phone_name) {
        return res.status(400).json({ message: "Phone name is required" });
    }

    const findPhoneQuery = `SELECT * FROM phones WHERE name = ?`;
    const insertPromote = `INSERT INTO promotions (phone_id,promo_name,discount_percentage,price_discount,start_date,end_date)
                            VALUE(?,?,?,?,?,?)`
    // const updatePriceQuery = `UPDATE phones
    //                     SET price=?
    //                     WHERE phone_id=?`

    try {
        // Query the database to find the phone
        const [rows] = await pool.promise().query(findPhoneQuery, [phone_name]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Phone not found" });
        }
        const phone_id = rows[0].phone_id;
        const old_price = rows[0].price;
        const newPrice = (old_price * (100 - discount_percent)) / 100;
        const insertvalue = [
            phone_id,
            promo_name,
            discount_percent,
            newPrice,
            start_date,
            end_date
        ]
        await pool.promise().query(insertPromote, insertvalue).then(([rows]) => {
            console.log(rows);
            res.status(200).json({
                message: "successfully",
                data: rows
            })

        })
            .catch((error) => {
                console.log(error);
                return res.status(400).json({
                    message: "something went wrong"
                })
            })

        console.log('price' + newPrice);
        const updatePriceValue = [
            newPrice,
            phone_id
        ]
        await pool.promise().query(updatePriceQuery, updatePriceValue).then(([rows]) => {
            res.status(200).json({
                message: "successfully",
                data: rows
            })
        })
            .catch((error) => {
                console.log(error)
                return res.status(400).json({
                    message: "something went wrong"
                })
            })
    } catch (error) {
        console.error("Database query error:", error);
        return res.status(400).json({ message: "Something went wrong", error: error.message });
    }
};
export const offerUpdate = (req, res) => {

}