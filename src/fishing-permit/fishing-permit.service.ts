import { Request } from "express";
import FishingPermit, { IFishingPermit } from "../Schema/FishingPermit";


class FishingPermitService {

    async createPermit(req: Request): Promise<IFishingPermit> {
        const { firstName, lastName, email, startsAt, endsAt } = req.body;

      const fishingPermit = new FishingPermit({
        firstName,
        lastName,
        email,
        startsAt,
        endsAt,
      });
      return await fishingPermit.save();
    }

    async findAll(): Promise<IFishingPermit[]> {
        return await FishingPermit.find()
    }

    async findById(id: string): Promise<IFishingPermit | null> {
        return await FishingPermit.findById(id);
    }
}

export default new FishingPermitService()