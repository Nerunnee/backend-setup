import fs from "node:fs/promises";

export const getMovies = async () => {
  try {
    const data = await fs.readFile("./data.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};
