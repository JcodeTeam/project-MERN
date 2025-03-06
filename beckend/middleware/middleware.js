const express = require('express');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const Middleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.use(expressLayouts);
  app.use(methodOverride('_method'));
  app.use(cors());
  app.use(cookieParser('secret'));
  app.use(
    session({
      cookie: { maxAge: 6000 },
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(flash());
};

module.exports = { Middleware };