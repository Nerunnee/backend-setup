import fs from "node:fs/promises";
import { Book } from "./types.js";

export const writeBooks = async (books: Book[]) => {
  try {
    await fs.writeFile("./data.json", JSON.stringify(books), "utf8");
  } catch (err) {
    console.error(err);
  }
};
