import cors from "cors";
// Load the express module to create a web application
import express from "express";
import router from "./router";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// app.use(express.urlencoded());

// app.use(express.text());

// app.use(express.raw());

// Import the API router

// Mount the API router under the "/api" endpoint

export default app;
