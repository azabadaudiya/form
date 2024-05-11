import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
config({path:"./config/config.env"});

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}));

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/v1/message",messageRouter);
dbConnection();

app.use(errorMiddleware);
export default app;