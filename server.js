
require("dotenv").config();

const express = require("express");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(productRoutes);

async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();
