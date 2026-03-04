import express from "express";
import type { Request, Response } from "express";

const server = express();
const port = 3000;

server.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

server.get("/student/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  res.status(200).send(`Сайн байна уу, ${name}`);
});

server.get("/filter", (req: Request, res: Response) => {
  const query = req.query;

  res.status(200).json(query);
});

server.post("/", (req: Request, res: Response) => {
  const headers = req.headers;
  console.log(headers);

  res.status(200).send("ok");
});

server.get("/kk", (req: Request, res: Response) => {
  const pathh = req.path;
  const methodd = req.method;

  res.status(200).send(`Та ${pathh} зам руу ${methodd} хүсэлт илгээлээ`);
});

server.get("/library/:category/:bookId", (req: Request, res: Response) => {
  const { category, bookId } = req.params;
  const method = req.method;
  const path = req.path;
  const query = req.query;
  const auth = req.headers.authorization;

  if (!auth) {
    res.status(403).send("Хандах эрхгүй");
  }

  res.status(200).json({
    status: "Амжилттай",
    request_info: { method, path, category },
    extracted_dat: { bookId, query, auth: "Verified" },
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
