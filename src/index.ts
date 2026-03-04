import express from "express";
import type { Request, Response } from "express";
import { getMovies } from "../utils/get-Movie.js";

const server = express();
const port = 3000;

server.use(express.json());

server.get("/movie", async (req: Request, res: Response) => {
  const movie = await getMovies();

  res.status(200).json({ message: "ok", movie });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
