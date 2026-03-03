import express from "express";
import type { Request, Response } from "express";
const server = express();
const port = 3000;

const secretToken = "Token1";

server.get("/movie/:type", (req: Request, res: Response) => {
  const query = req.query;
  console.log(query);

  const params = req.params;
  console.log(params);

  const headers = req.headers;
  console.log(headers);

  const token: any = headers.authorization?.split(" ");
  const newToken = token.pop();
  console.log(newToken);

  if (newToken !== secretToken) return res.status(403).json("fail");

  res.status(200).json("ok");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
