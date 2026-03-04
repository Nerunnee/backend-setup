import express from "express";
import type { Request, Response } from "express";
const server = express();
const port = 3000;

let books = [
  { id: 1, title: "Avatar", author: "h" },
  { id: 2, title: "Avatar", author: "h" },
];

server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

server.get("/books", (req: Request, res: Response) => {
  res.status(200).send(books);
});

server.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const book = books.find((book) => String(book.id) === String(id));

  res.status(200).send(book);
});

server.post("/books", (req: Request, res: Response) => {
  const { title, author } = req.body;

  const newBookId = books.length + 1;

  const newBook = { id: newBookId, title, author };

  books.push(newBook);

  res.status(200).send(books);
});

server.put("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;

  books = books.map((book) => {
    if (String(book.id) === String(id)) {
      const updateBook = {
        id: book.id,
        title: title,
        author: author,
      };

      return updateBook;
    } else {
      return book;
    }
  });

  res.status(200).send(books);
});

server.delete("/books", (req: Request, res: Response) => {
  res.status(200).send(books);
});

server.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const foundBook = books.find((book) => String(book.id) === String(id));

  if (!foundBook) {
    res.status(404).json({ message: "not found" });
    return;
  }

  const deletedBook = books.filter((book) => String(book.id) !== String(id));

  books = deletedBook;

  res.status(200).json({ message: "Successfully" });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
