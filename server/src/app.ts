// Load the express module to create a web application

import express from "express";

const app = express();
const cors = require("cors");

app.use(cors());

// Import the API router
import router from "./router";

// Mount the API router under the "/api" endpoint
app.use(router);

export default app;
