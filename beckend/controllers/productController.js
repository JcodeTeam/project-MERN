const Product = require("../models/productModel");

exports.index = async (req, res) => {
  try {
    const produk = await Product.find();
    res.render("produk", { layout: 'layouts/app.ejs', produk }); // Render tampilan EJS
    // res.status(200).json(products); // Jika Menggunakan API
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan", details: err });
  }
};

exports.create = (req, res) => {
  res.render("tambah", { layout: 'layouts/app.ejs' }); // Render form tambah produk
};

exports.store = async (req, res) => {
  try {
    const { nama, harga, stok } = req.body;
    if (!nama || !harga || !stok) {
      return res.status(400).json({ error: "Semua field harus diisi" });
    }

    const produkBaru = new Product({nama, harga, stok});
    await produkBaru.save();

    res.redirect("/produk"); // Redirect ke halaman produk setelah tambah
    // res.status(201).json({message: "Produk berhasil ditambahkan"}); // Menggunakan API
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan", details: err });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const produk = await Product.findById(id);

    if (!produk)
      return res.status(404).json({ error: "Produk tidak ditemukan" });

    res.render("detail", { layout: 'layouts/app.ejs', produk }); // Render tampilan detail produk
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan", details: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const produk = await Product.findById(id);

    if (!produk)
      return res.status(404).json({ error: "Produk tidak ditemukan" });

    res.render("edit", { layout: 'layouts/app.ejs', produk }); // Render form edit
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan", details: err });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, harga, stok } = req.body;

    const produk = await Product.findByIdAndUpdate(id, { nama, harga, stok }, { new: true });

    if (!produk) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.redirect("/produk"); // Redirect setelah update
    // res.status(201).json({ message: "Produk berhasil diperbaharui" }); // Menggunakan API
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan", details: err });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const produk = await Product.findByIdAndDelete(id);

    if (!produk) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.redirect("/produk"); // Redirect setelah hapus
    // res.status(201).json({ message: "Produk berhasil dihapus" }); // Menggunakan API
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan", details: err });
  }
};
