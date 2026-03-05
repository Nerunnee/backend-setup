import express from "express";
import type { Request, Response } from "express";
import { readBooks } from "../utils/get-readbooks.js";
import { writeBooks } from "../utils/get-writebooks.js";

const server = express();
const port = 3000;

server.use(express.json());

server.get("/books", async (req: Request, res: Response) => {
  const books = await readBooks();

  if (!books) {
    return res.status(403).json({ message: "failed", books: [] });
  }

  res.status(200).json({ message: "ok", books });
});

server.get("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const books = await readBooks();
  const book = books.find((book) => String(book.id) === id);

  res.status(200).json({ message: "ok", book });
});

server.post("/books", async (req: Request, res: Response) => {
  const { title, author } = req.body;

  const books = await readBooks();

  const newBookId = new Date().getTime();

  const newBook = {
    id: newBookId,
    title,
    author,
  };

  const updatedBooks = [...books, newBook];

  await writeBooks(updatedBooks);
  res.status(200).json({ message: "ok", books });
});

server.put("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;

  let books = await readBooks();

  books = books.map((book) => {
    if (String(book.id) === id) {
      const updatedBook = {
        id: book.id,
        title,
        author,
      };

      return updatedBook;
    } else {
      return book;
    }
  });

  await writeBooks(books);
  res.status(200).json({ message: "ok", books });
});

server.delete("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const books = await readBooks();
  const foundBook = books.find((book) => String(book.id) === id);

  if (!foundBook) {
    return res.status(403).json({ message: "Not Found" });
  }

  const deletedBook = books.filter((book) => String(book.id) !== id);
  await writeBooks(deletedBook);

  res.status(200).json({ mesage: "Success", books });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
