require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const connectDB = require("./config/db");
const Middleware = require('./middleware/middleware');

const app = express();
const port = process.env.PORT || 5000;

connectDB();


// Middleware
Middleware.Middleware(app);


//route
app.use("/produk", productRoutes);

app.get("/", (req, res) => {
  res.redirect("/produk");
});


// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
