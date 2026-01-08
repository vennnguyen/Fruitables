// const express = require('express');
import express from "express";
import "dotenv/config";
import webRoutes from "./routes/web";
import { initDatabase } from "config/seed";

const app = express();

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

app.listen(PORT, () => {
  console.log(`My app is running on ${PORT}`);
});
