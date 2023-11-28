import { Request, Response } from "express";
import fishingPermitService from "./fishing-permit.service";

export class FishingPermitController {
  async createPermit(req: Request, res: Response) {
    try {
      const savedPermit = await fishingPermitService.createPermit(req);

      res.status(201).json(savedPermit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create fishing permit" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const fishingPermits = await fishingPermitService.findAll(req);
      res.status(200).json(fishingPermits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve fishing permits" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req?.query?.id?.toString() || "";
      const fishingPermit = await fishingPermitService.findById(id);
      res.status(200).json(fishingPermit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve fishing permits" });
    }
  }

  async findMyPermits(req: Request, res: Response) {
    try {
      const fishingPermit = await fishingPermitService.findMyPermits(req);
      res.status(200).json(fishingPermit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve fishing permits" });
    }
  }

  async addCatchToFishingPermit(req: Request, res: Response) {
    try {
      const { success, error } =
        await fishingPermitService.addCatchToFishingPermit(req);

      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(success);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update fishing permit" });
    }
  }
}

export default new FishingPermitController();
