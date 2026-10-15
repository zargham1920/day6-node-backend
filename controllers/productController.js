
const Product=require("../models/product");

async function getAllProducts(req,res){
    try{
        const product= await Product.find();
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:"Error fetching products", error:error.message});
    }
}


async function getProductsById(req,res){
    try{
        const id=req.params.id;
        const product=await Product.findById(id);
        if(!product){
           return res.status(404).json({message:"Product not found"});
        }else{
            res.status(200).json(product);
        }
    }catch(error){
        if (error.name === "CastError") {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }
        res.status(500).json({message:"error fetching product", error:error.message})
    }
}


async function createProduct(req, res) {
    try {
        const { name, price, stock, category } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        if (typeof price !== "number" || price <= 0) {
            return res.status(400).json({
                message: "Price must be a number greater than 0"
            });
        }

        if (typeof stock !== "number" || stock < 0) {
            return res.status(400).json({
                message: "Stock must be a number greater than or equal to 0"
            });
        }

        if (typeof category !== "string" || !category.trim()) {
            return res.status(400).json({
                message: "Category is required"
            });
        }

        const newProduct = await Product.create({
            name: name.trim(),
            price,
            stock,
            category: category.trim()
        });

        res.status(201).json(newProduct);

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Product validation failed",
                error: error.message
            });
        }

        res.status(500).json({
            message: "Error creating product",
            error: error.message
        });
    }
}



async function updateProduct(req,res){
    try{
        const id=req.params.id;
        const updatedProduct=await Product.findByIdAndUpdate(
            id,
            req.body,
            {new:true, runValidators:true}
        );
        if(!updatedProduct){
            return res.status(404).json({message:"product did'nt exist"});
        }
        res.status(200).json(updatedProduct);
    }catch(error){
        if (error.name === "CastError") {
            return res.status(400).json({message: "Invalid product ID"});
        }
        res.status(500).json({message:"Failed to update product",error:error.message});
    }
}


async function deleteProduct(req, res) {
    try {
        const id = req.params.id;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
}


module.exports={getAllProducts, getProductsById, createProduct, updateProduct, deleteProduct};