// const express = require('express');
/// <reference path="./types/index.d.ts"/>
import express from "express";
import "dotenv/config";
import webRoutes from "./routes/web";
import { initDatabase } from "config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { render } from "ejs";

const app = express();
// config session
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
// config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();

// middleware user local khi login thành công
app.use((req, res, next) => {
  res.locals.user = req.user ?? null; // pass user object all to locals
  next();
});
//config view engine
app.set("view engine", "ejs");

app.set("views", __dirname + "/views");

//config static file
app.use(express.static("public"));

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config routes
webRoutes(app);

// init fake database
initDatabase();
const PORT = process.env.PORT || 8080;
// handle 404 not found
app.use((req, res) => {
  res.render("status/404");
});
app.listen(PORT, () => {
  console.log(`My app is running on ${PORT}`);
});
