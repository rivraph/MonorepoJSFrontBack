import categoryRepository from "./categoryRepository";

// Some data to make the trick

// Declare the actions

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all categories
    const categories = await categoryRepository.readAll();

    // Respond with the categories in JSON format
    res.json(categories);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific category based on the provided ID
    const categoryId = Number(req.params.id);
    const category = await categoryRepository.read(categoryId);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (category == null) {
      res.sendStatus(404);
      console.info("erreur 404");
    } else {
      res.json(category);
      console.info("tableau json");
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
    console.info("err");
  }
};
// Export them to import them somewhere else
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific category based on the provided ID
    const category = {
      id: Number(req.params.id),
      name: req.body.name,
    };

    const affectedRows = await categoryRepository.update(category);
    console.info("Edition OK");
    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = {
      name: req.body.name,
    };
    const insertId = await categoryRepository.create(newCategory);
    res.status(201).json({ insertId });
    console.info(req.body.name);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific category based on the provided ID
    const categoryId = Number(req.params.id);

    await categoryRepository.delete(categoryId);
    console.info("catégorie bien supprimé");
    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };
  const errors: ValidationError[] = [];
  console.info("Test du corps de la requête :", req.body);
  const { name } = req.body;

  if (name == null) {
    console.info("name renvoi NULL");
    errors.push({ field: "name", message: "The field is required" });
  } else if (name.length > 255) {
    console.info("name > 255 caractères");
    errors.push({
      field: "name",
      message: "Should contain less than 255 characters",
    });
  }

  if (errors.length === 0) {
    console.info("length empty");
    next();
  } else {
    console.info("length not empty");
    res.status(400).json({ validationErrors: errors });
  }
};

export default { browse, read, edit, add, destroy, validate };
