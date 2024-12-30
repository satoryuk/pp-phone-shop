import pool from "../../db/db_handle.js";


export const offerInsert = async (req, res) => {
    const { phone_name, promo_name, discount_percent, start_date, end_date, colors } = req.body;
    console.log(req.body);

    // Check if required fields are provided
    if (!phone_name || !promo_name || !discount_percent || !start_date || !end_date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const findPhoneQuery = `SELECT * FROM phones p
                            INNER JOIN phone_variants pv 
                            ON pv.phone_id = p.phone_id
                            WHERE p.name = ? AND pv.color = ?`;

    const insertPromote = `INSERT INTO promotions (phone_variants_id, promo_name, discount_percentage, start_date, end_date) 
                           VALUES (?, ?, ?, ?, ?)`;

    try {
        const phone_variants_id = [];

        // Find all phone IDs by looping through colors
        for (let color of colors) {
            const [rows] = await pool.promise().query(findPhoneQuery, [phone_name, color]);
            if (rows.length > 0) {
                rows.forEach(row => phone_variants_id.push(row.idphone_variants));
            }
        }
        // console.log(phone_variants_id);


        if (phone_variants_id.length === 0) {
            return res.status(404).json({ message: "No matching phones found" });
        }

        // Insert promotion details for each phone ID
        const insertResults = [];
        for (let id of phone_variants_id) {
            const [result] = await pool.promise().query(insertPromote, [
                id,
                promo_name,
                discount_percent,
                start_date,
                end_date
            ]);
            insertResults.push(result);
        }


        res.status(200).json({
            message: "Promotions inserted successfully",
            data: insertResults,
        });

    } catch (error) {
        console.error("Database query error:", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
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
