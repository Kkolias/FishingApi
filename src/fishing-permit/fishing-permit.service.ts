import { Request } from "express";
import FishingPermit, { IFishingPermit } from "../Schema/FishingPermit";
import { isAdmin } from "../user/utils/isAdmin";
import userService from "../user/user.service";

class FishingPermitService {
  async createPermit(req: Request): Promise<IFishingPermit> {
    const { firstName, lastName, email, startsAt, endsAt } = req.body;

    const user = await userService.getUserByToken(req);
    const userId = user?._id || null;

    const fishingPermit = new FishingPermit({
      firstName,
      lastName,
      email,
      startsAt,
      endsAt,
      userId,
    });
    return await fishingPermit.save();
  }

  async findAll(req: Request): Promise<IFishingPermit[]> {
    const isUserAdmin = await isAdmin(req);
    if (!isUserAdmin) return [];
    return await FishingPermit.find();
  }

  async findById(id: string): Promise<IFishingPermit | null> {
    return await FishingPermit.findById(id);
  }

  async findMyPermits(req: Request): Promise<IFishingPermit[]> {
    const user = await userService.getUserByToken(req)
    const userId = user?._id || null
    if(!userId) return []

    const permits = await FishingPermit.find({ userId })
    return permits
  }
}

export default new FishingPermitService();
