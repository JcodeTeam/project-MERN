const mongoose = require("mongoose");

// Definisikan schema produk
const productSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true },
});

// Buat model berdasarkan schema
const Product = mongoose.model("Product", productSchema);
// mongoose.model("Product", productSchema) membuat model bernama "Product", 
// yang akan otomatis dikaitkan dengan koleksi "products" di MongoDB(Mongoose otomatis mengubahnya menjadi bentuk jamak).

module.exports = Product;
