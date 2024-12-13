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