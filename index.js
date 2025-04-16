import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/connectDB.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./Routers/userRouter.js";
import { billingrouter } from "./Routers/billingRouter.js";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Routers
app.use("/api", userRouter);
app.use("/api",billingrouter);


const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT || 3500, () => {
      console.log(`Server is listening on ${PORT}`);
      console.log("MongoDb connected");
    });
  })
  .catch((error) => {
    console.log(error);
  });



