import mongoose, { Schema, Document } from "mongoose";

export enum LakeId {
  salaisjarvi = "salaisjarvi",
}

export enum FishSpecies {
  kirjolohi = "kirjolohi",
  ahven = "ahven",
}

export interface CatchedFish {
  specie: FishSpecies;
  weightInGrams: number;
}

export interface IFishingPermit extends Document {
  firstName: string;
  lastName: string;
  email: string;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  userId: string;
  lakeId: LakeId;
  catches: CatchedFish[];
}

const FishingPermitSchema = new Schema<IFishingPermit>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  startsAt: { type: Date, required: true },
  endsAt: { type: Date, required: true },
  userId: { type: String, required: false, default: null },
  lakeId: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now() },
  catches: [
    {
      specie: String,
      weightInGrams: Number,
    },
  ],
});

const FishingPermit = mongoose.model<IFishingPermit>(
  "FishingPermit",
  FishingPermitSchema
);

export default FishingPermit;
