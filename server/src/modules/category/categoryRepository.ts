import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class categoryRepository {
  async readAll(): Promise<Category[]> {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table

    const [result] = await databaseClient.query("select * from category");

    // Return the array of categories

    return result as Category[];
  }
  async read(id: number): Promise<Category | null> {
    try {
      const [result] = await databaseClient.query(
        `SELECT 
            category.*, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    "id", program.id, 
                    "title", program.title
                )
            ) AS programs 
        FROM 
            category 
        LEFT JOIN 
            program 
        ON 
            program.category_id = category.id 
        WHERE 
            category.id = ? 
        GROUP BY 
            category.id`,
        [id], // Passer `id` comme valeur pour remplacer le `?` dans la requête
      );
      const rows = result as Category[];
      // Retourner le premier résultat trouvé, ou null si aucun résultat
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Erreur lors de la récupération de la catégorie:", error);
      throw error;
    }
  }

  async update(category: Category) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update category set name = ? where id = ?",
      [category.name, category.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async create(category: Omit<Category, "id">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO category (name) VALUES (?)",
      [category.name],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from category where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new categoryRepository();
