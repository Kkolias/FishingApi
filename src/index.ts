import express, { Request, Response } from "express";
import mongoose from "mongoose";
import FishingPermit from "./Schema/FishingPermit";
import bodyParser from "body-parser";
import userService from "./user/user.service";

const app = express();
const port = 8000;

const cors = require("cors");

// app.use(express.json());

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

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017");

const mongoUrl = `mongodb://localhost:27017`; // dev

mongoose.connect(mongoUrl, { dbName: "fishing-permit-db" });

// API routes
app.get("/", cors(corsOptions), (req: Request, res: Response) => {
  res.send("Home page!");
});

app.post(
  "/fishing-permit/create",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    try {
      // console.log(JSON.stringify(req, null ,2))
      const { firstName, lastName, email, startsAt, endsAt } = req.body;

      const fishingPermit = new FishingPermit({
        firstName,
        lastName,
        email,
        startsAt,
        endsAt,
      });
      const savedPermit = await fishingPermit.save();

      res.status(201).json(savedPermit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create fishing permit" });
    }
  }
);

app.get(
  "/fishing-permit/get-all",
  cors(corsOptions),
  async (_req: Request, res: Response) => {
    console.log(_req);
    try {
      const fishingPermits = await FishingPermit.find();
      res.status(200).json(fishingPermits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve fishing permits" });
    }
  }
);

app.get(
  "/fishing-permit/get-by-id",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    try {
      const id = req?.query?.id || null;
      const fishingPermit = await FishingPermit.findById(id);
      res.status(200).json(fishingPermit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve fishing permits" });
    }
  }
);

app.post(
  "/user/create",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const role = req.body?.role;

      const createdUser = await userService.signUp({
        email,
        password,
        firstName,
        lastName,
        role,
      });

      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }
);

app.post(
  "/user/login",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const { error, success } = await userService.login({ email, password });

      if (error?.length) {
        res.status(500).json({ success, error });
      } else {
        res.status(201).json({ success, error });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to login" });
    }
  }
);

app.get(
  "/user/get-by-token",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserByToken(req);

      if (!user) {
        res.status(500).json(user);
      } else {
        res.status(201).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to login" });
    }
  }
);

app.post(
  "/user/update-role",
  cors(corsOptions),
  async (req: Request, res: Response) => {
    try {
      const output = await userService.updateRole(req);

      if (output?.error?.length) {
        res.status(500).json(output);
      } else {
        res.status(201).json(output);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update" });
    }
  }
);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
