import pool from "../db/db_handle.js";
import bcrypt from "bcrypt";

export const addNewBrand=(req,res)=>{
    const {brand}=req.body;

    const query=`INSERT INTO brands(name) VALUE(?)`;

    pool.query(query,brand,(err,result)=>{
        if(err)return res.status(400).json({message:"something went wrong"})
        return res.status(200).json({message:"Insert Successfully",data:result})
    })
}
export const addNewCategory=(req,res)=>{
    const{category}=req.body;

    const query=`INSERT INTO categories (name) VALUE(?)`;

    pool.query(query,category,(req,res)=>{
        if(err)return res.status.json({message:"something went wrong"});

        return res.status.json({message:"Insert Successfully"})
    })
}
export const displayAllProduct=(req,res)=>{
    const query="SELECT * FROM phones p INNER JOIN specifications s ON p.phone_id=s.phone_id"

    pool.query(query,(err,rows)=>{
        if(err)return res.status(400).json({message:"something went wrong"})
        res.status(200).json({
            data:rows,
            message:"sucessfully"
        })
    })
    console.log(req.session.refreshToken);
    
}
export const searchProduct=(req,res)=>{
    const {name}=req.body;
    const query="SELECT * FROM phones p INNER JOIN specifications s ON p.phone_id=s.phone_id WHERE p.name=?";
    
    pool.query(query,name,(err,rows)=>{
        if(err) return res.status(400).json({message:"something went wrong"});
        res.status(200).json({
            data:rows,
            message:"sucessfully"
        })
    })
}
export const addNewProduct=(req,res)=>{
    const {name,description,price,stock,name_category,name_brand,release_date,screen_size,processor,ram,storage,battery,camera}=req.body;
    const category_query=`SELECT category_id from categories WHERE category_name=?`;
    const brand_query='SELECT brand_id from brands WHERE brand_name=?';
    const addProductQuery='INSERT INTO phones (name, description, price, stock, category_id, brand_id, release_date) VALUES(?,?,?,?,?,?,?)'
    const addSpecific="INSERT INTO specifications (phone_id, screen_size, processor, ram, storage, battery, camera) VALUES(?,?,?,?,?,?,?)"
    
    pool.query(category_query,name_category,(err,rows)=>{
        if(err)return res.json.status(400).json({message:"something went wrong"})
        const category_id=rows[0].category_id;
        pool.query(brand_query,name_brand,(err,rows)=>{
            const brand_id=rows[0].brand_id;
            const valueProduct=[name,description,price,stock,category_id,brand_id,release_date];
            pool.query(addProductQuery,valueProduct,(err,rows)=>{
                if(err)return res.status(400).json({message:"something went wrong"});
                const lastIndex=rows.insertId;
                const valueSpecific=[lastIndex,screen_size,processor,ram,storage,battery,camera];
                pool.query(addSpecific,valueSpecific,(err,rows)=>{
                    if(err) return res.status(400).json({message:"something went wrong"})
                    res.status(400).json({data:rows,message:"successfully"})
                })
            })
        })
    })
}
export const updateProduct = (req, res) => {
    const {
        id,
        new_name,
        description,
        price,
        stock,
        name_category,
        name_brand,
        release_date,
        screen_size,
        processor,
        ram,
        storage,
        battery,
        camera,
    } = req.body;

    const categoryQuery = `SELECT category_id FROM categories WHERE category_name = ?`;
    const brandQuery = `SELECT brand_id FROM brands WHERE brand_name = ?`;
    const updateProductQuery = `UPDATE phones SET name=?,description = ?, price = ?, stock = ?, category_id = ?, brand_id = ?, release_date = ? WHERE phone_id = ?`;
    const updateSpecificQuery = `UPDATE specifications SET screen_size = ?, processor = ?, ram = ?, storage = ?, battery = ?, camera = ? WHERE phone_id = ?`;

    // Get category_id
    pool.query(categoryQuery, name_category, (err, rows) => {
        if (err) return res.status(400).json({ message: "Something went wrong category" });

        const category_id = rows[0].category_id;

        // Get brand_id
        pool.query(brandQuery, name_brand, (err, rows) => {
            if (err) return res.status(400).json({ message: "Something went wrong in brand" });

            const brand_id = rows[0].brand_id;

            // Update the phones table
            const valueProduct = [
                new_name,
                description,
                price,
                stock,
                category_id,
                brand_id,
                release_date,
                id, 
            ];
            pool.query(updateProductQuery, valueProduct, (err, result) => {
                if (err) return res.status(400).json({ message: "Something went wrong product" });

                // If the product was found and updated
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Product not found" });
                }

                const phoneIdQuery = `SELECT phone_id FROM phones WHERE name = ?`;
                pool.query(phoneIdQuery, new_name, (err, rows) => {
                    if (err) return res.status(400).json({ message: "Something went wrong spec" });


                    // Update the specifications table
                    const valueSpecific = [
                        screen_size,
                        processor,
                        ram,
                        storage,
                        battery,
                        camera,
                        id,
                    ];
                    pool.query(updateSpecificQuery, valueSpecific, (err, result) => {
                        if (err) return res.status(400).json({ message: "Something went wrong" });
                        
                        res.status(200).json({ message: "Product updated successfully" });
                    });
                });
            });
        });
    });
};

export const deleteProduct=(req,res)=>{
    const {id}=req.body;
    const queryDeleteProdcut="DELETE FROM phone WHERE phone_id=?";
    const queryDeleteSpec="DELECT FROM specifications WHERE phone_id=?";

    pool.query(queryDeleteProdcut,id,(err,rows)=>{
        if(err) return res.status(400).json({message:"something went wrong"})
        res.status(200).json({message:"sucessfully"})
        pool.query(queryDeleteSpec,id,(err,rows)=>{
            if(err) return res.status(400).json({message:"something went wrong"})
            res.status(200).json({message:"sucessfully"})
        })
    })
}