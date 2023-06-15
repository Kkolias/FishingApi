import express, { Request, Response } from "express";
import mongoose from "mongoose";
import FishingPermit from "./Schema/FishingPermit";

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017");

// API routes
app.get("/", (req: Request, res: Response) => {
  res.send("Home page!");
});


app.post("/fishing-permit/create", async (req: Request, res: Response) => {
  try {
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
});

app.get("/fishing-permit/get-all", async (_req: Request, res: Response) => {
    try {
        const fishingPermits = await FishingPermit.find();
        res.status(200).json(fishingPermits);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve fishing permits' });
      }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
