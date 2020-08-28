import express from "express";
import cors from "cors";
import { PORT, FRONTEND_URLS } from "./constants";

const main = async () => {
  const app = express();

  // CORS Middleware
  app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URLS
    })
  );

  // Testing Endpoint
  app.get("/ping", (_req, res) => {
    res.send("pong!");
  });

  // Running Instance of App on Localhost
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}...`);
  });
};

main();
