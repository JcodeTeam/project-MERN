const express = require('express');

const staticFiles = (app) => {
  app.use(express.static("public"));
};

// ini parameter (err, req, res, next)
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = { staticFiles, errorHandler};