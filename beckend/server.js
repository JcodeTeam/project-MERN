require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const connectDB = require("./config/db");
const {staticFiles, errorHandler} = require('./middleware/middleware');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// Buat Overide Method
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
staticFiles(app);
// app.use(express.static('public'));


// Set view engine EJS
app.set("view engine", "ejs");
app.use(expressLayouts)

//route
app.use("/produk", productRoutes);

app.get("/", (req, res) => {
  res.redirect("/produk");
});

// Error Handling Middleware
app.use(errorHandler);

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
