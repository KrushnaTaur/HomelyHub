import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";

import { router } from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";

dotenv.config();

const app = express();

/* ✅ SAFE CORS (NO wildcard route) */
app.use(
  cors({
    origin: process.env.ORIGIN_ACCESS_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

/* ✅ Body parsers */
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

/* ✅ Health check */
app.get("/", (req, res) => {
  res.send("HomelyHub Backend is running 🚀");
});

/* ✅ DB */
connectDB();

/* ✅ Routes */
app.use("/api/v1/rent/user", router);
app.use("/api/v1/rent/listing", propertyRouter);
app.use("/api/v1/rent/user/booking", bookingRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
