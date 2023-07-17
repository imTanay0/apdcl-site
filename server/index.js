import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/ConnectDB.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import divisionRoutes from "./routes/divisionRoutes.js";

// Config
dotenv.config({ path: "database/.env" });

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/division", divisionRoutes);

// connect to database
connectDB();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT, () =>
  console.log(`App listening on port http://localhost:${process.env.PORT}`)
);
