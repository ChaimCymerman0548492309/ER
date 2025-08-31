import { Router } from "express";
import { ItemController } from "./controller";
import { JsonRepository } from "./repository";

const repo = new JsonRepository();
const controller = new ItemController(repo);
const router = Router();




router.post("/adimidPatient", controller.adimidPatient);
router.post("/dischargPatient", controller.dischargPatient);
router.get("/getQueeStatus", controller.getQueeStatus);
router.get("/getRoomStatus", controller.getRoomStatus);

export default router;
