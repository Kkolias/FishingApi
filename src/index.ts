import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRouter from './routes/user.routes'
import fishingPermitRouter from './routes/fishing-permit.routes'

const app = express();
const port = 8000;

const cors = require("cors");

const allowedOrigins = ["http://localhost:8000", "100.112.240.70"];
const corsOptions = {
  origin: function (origin: string, callback: any) {
    if (!origin) {
      callback(null, true);
    } else if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// USES
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use('/user', userRouter)
app.use('/fishing-permit', fishingPermitRouter)


const mongoUrl = `mongodb://localhost:27017`; // dev
mongoose.connect(mongoUrl, { dbName: "fishing-permit-db" });

// API routes
app.get("/", cors(corsOptions), (req: Request, res: Response) => {
  res.send("Home page!");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
