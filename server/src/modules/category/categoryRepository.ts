import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Item = {
  id: number;
  title: string;
};

class categoryRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table

    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categories

    return rows as Item[];
  }
}

export default new categoryRepository();
