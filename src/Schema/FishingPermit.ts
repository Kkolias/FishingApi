import mongoose, { Schema, Document } from "mongoose";

export interface IFishingPermit extends Document {
  firstName: string;
  lastName: string;
  email: string;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  userId: string
}

const FishingPermitSchema = new Schema<IFishingPermit>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  startsAt: { type: Date, required: true },
  endsAt: { type: Date, required: true },
  userId: { type: String, required: false, default: null },
  createdAt: { type: Date, default: () => Date.now() },
});

const FishingPermit = mongoose.model<IFishingPermit>(
  "FishingPermit",
  FishingPermitSchema
);

export default FishingPermit;
