import { Request } from "express";
import FishingPermit, { IFishingPermit } from "../Schema/FishingPermit";
import { isAdmin } from "../user/utils/isAdmin";
import userService from "../user/user.service";
import { isAdminOrOwnsPermit } from "../user/utils/isAdminOrOwnsPermit";

class FishingPermitService {
  async createPermit(req: Request): Promise<IFishingPermit> {
    const { firstName, lastName, email, startsAt, endsAt, lakeId } = req.body;

    const user = await userService.getUserByToken(req);
    const userId = user?._id || null;

    const fishingPermit = new FishingPermit({
      firstName,
      lastName,
      email,
      startsAt,
      endsAt,
      userId,
      lakeId,
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

  async addCatchToFishingPermit(req: Request): Promise<{success?: IFishingPermit, error?: string}> {
    const {permitId, specie, weightInGrams } = req.body
    const [ user, fishingPermit ] = await Promise.all([
      userService.getUserByToken(req),
      this.findById(permitId)
    ])

    
    const canAccess = isAdminOrOwnsPermit(user, fishingPermit)
    console.log("ASDADADAD", canAccess)

    if(!canAccess) return { error: 'Cannot edit fishin permit' }

    const catchToSave = {
      specie,
      weightInGrams
    }

    fishingPermit?.catches.push(catchToSave)
    const updated = await fishingPermit?.save()
    return { success: updated }
  }
}

export default new FishingPermitService();
