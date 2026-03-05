import fs from "node:fs/promises";
import { Book } from "./types.js";

export const readBooks = async () => {
  try {
    const data = await fs.readFile("./data.json", "utf8");
    const books: Book[] = JSON.parse(data);

    return books;
  } catch (error) {
    console.error(error);
    return [];
  }
};
