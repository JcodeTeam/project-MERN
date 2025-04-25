const Product = require("../models/productModel");

exports.index = async (req, res) => {
    try {
        const produk = await Product.find();
        // res.render("produk", { layout: 'layouts/app.ejs', produk, msg: req.flash('msg') }); // Render tampilan EJS
        res.status(200).json(produk); // Jika Menggunakan API
    } catch (err) {
        res.status(500).json({ error: "Terjadi kesalahan", details: err });
    }
};

exports.store = async (req, res) => {
    try {
        const { nama, harga, stok } = req.body;
        if (!nama || !harga || !stok) {
            return res.status(400).json({ error: "Semua field harus diisi" });
        }

        const produkBaru = new Product({ nama, harga, stok });
        await produkBaru.save();

        req.flash('msg', 'Produk berhasil ditambahkan!');
        // res.redirect("/produk"); 
        res.status(201).json({ message: "Produk berhasil ditambahkan" });
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

        // res.render("detail", { layout: 'layouts/app.ejs', produk }); 
        res.status(201).json({ produk });
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

        req.flash('msg', 'Produk berhasil diubah!');
        // res.redirect("/produk"); 
        res.status(201).json({ message: "Produk berhasil diperbaharui" });
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

        req.flash('msg', 'Proudk berhasil dihapus!');
        // res.redirect("/produk"); 
        res.status(201).json({ message: "Produk berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: "Terjadi kesalahan", details: err });
    }
};
