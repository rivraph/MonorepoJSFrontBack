import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Wild Series !");
});

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Declaration of a "Welcome" route

import sayActions from "./modules/say/sayActions";

router.get("/", sayActions.sayWelcome);

/* ************************************************************************* */

// Declaration of a "category" route

import categoryActions from "./modules/category/categoryActions";

router.get("/api/category", categoryActions.browse);
router.get("/api/category/:id", categoryActions.read);
router.put("/api/category/:id", categoryActions.validate, categoryActions.edit);
router.post("/api/category", categoryActions.validate, categoryActions.add);
router.delete("/api/category/:id", categoryActions.destroy);

/* ************************************************************************* */

// Declaration of a "program" route

import programActions from "./modules/program/programActions";

router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);

export default router;
