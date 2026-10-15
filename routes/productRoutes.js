    const express = require("express");
    const router = express.Router();
    module.exports={getAllProducts, getProductsById, createProduct, updateProduct, deleteProduct} = require("../controllers/productController");


    router.get("/products",getAllProducts);


    router.get("/products/:id",getProductsById);

    router.post("/products", createProduct);

    router.put("/products/:id",updateProduct);

    router.delete("/products/:id",deleteProduct);

    module.exports = router;