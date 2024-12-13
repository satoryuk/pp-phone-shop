import pool from "../../db/db_handle.js";


export const offerInsert = async (req, res) => {
    const { phone_name, promo_name, discount_percent, start_date, end_date } = req.body;

    // Check if required fields are provided
    if (!phone_name || !promo_name || !discount_percent || !start_date || !end_date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const findPhoneQuery = `SELECT * FROM phones WHERE name = ?`;
    const insertPromote = `INSERT INTO promotions (phone_id, promo_name, discount_percentage, start_date, end_date) 
                           VALUES (?, ?, ?, ?, ?)`;

    try {
        // Find the phone by its name
        const [phoneRows] = await pool.promise().query(findPhoneQuery, [phone_name]);

        if (phoneRows.length === 0) {
            return res.status(404).json({ message: "Phone not found" });
        }

        const phone_id = phoneRows[0].phone_id;

        // Insert promotion details into the promotions table
        const [result] = await pool.promise().query(insertPromote, [
            phone_id,
            promo_name,
            discount_percent,
            start_date,
            end_date
        ]);

        res.status(200).json({
            message: "Promotion inserted successfully",
            data: result
        });

    } catch (error) {
        console.error("Database query error:", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const offerUpdate = async (req, res) => {
    const { offerID } = req.params;
    const { phone_id } = req.query;
    const { promo_name, discount_percent, start_date, end_date } = req.body;

    if (!offerID, !phone_id, !promo_name, !discount_percent, !start_date, !end_date) {
        return res.status(500).json({
            message: "fill all the blank"
        })
    }

    const queryUpdate = `
    UPDATE promotions
    SET promo_name=?,
        discount_percentage=?,
        price_discount=?,
        start_date=?,
        end_date=?
    WHERE promo_id=?
    `
    const queryFind = `
    SELECT price
    FROM phones
    WHERE phone_id=?
`;

    try {
        const [phone] = await pool.promise().query(queryFind, [phone_id]);
        const old_price = phone[0].price
        console.log(old_price);

        const new_price = old_price * (100 - discount_percent) / 100
        console.log(new_price);

        const value = [
            promo_name,
            discount_percent,
            new_price,
            start_date,
            end_date,
            offerID
        ]

        await pool.promise().query(queryUpdate, value).then(([rows]) => {
            console.log(rows);
            res.status(200).json({
                message: 'successfully',
                data: rows
            })
        }).catch((error) => {
            console.log(error);
            res.status(400).json({
                message: "something went wrong"
            })
        })
    } catch (error) {
        console.log(error);
    }
}
export const offerDelete = async (req, res) => {
    const { offerID } = req.params;

    const queryDelete = `
    DELETE FROM promotions
    WHERE promo_id=?
    `
    await pool.promise().query(queryDelete, [offerID]).then(([rows]) => {
        console.log(rows)
        res.status(200).json({
            message: 'successfully',
            data: rows
        })
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            message: "something went wrong"
        })
    })
}
