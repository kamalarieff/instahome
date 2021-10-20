import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import companiesRouter from "./routes/v1/companies";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/companies", companiesRouter);

export default app;
