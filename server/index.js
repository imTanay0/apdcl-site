import express from "express";
import dotenv from "dotenv";

import connectDB from "./database/ConnectDB.js";
// import userRoutes from "./routes/userRoutes.js";

// Config
dotenv.config({ path: "database/.env" });

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// app.use("/api/v1/user", userRoutes);

// connect to database
connectDB();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT, () =>
  console.log(
    `App listening on port http://localhost:${process.env.PORT}`
  )
);
