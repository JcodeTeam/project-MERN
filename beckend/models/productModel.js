const mongoose = require("mongoose");

// Definisikan schema produk
const productSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true },
});

// Buat model berdasarkan schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
