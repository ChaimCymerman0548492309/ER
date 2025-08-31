import { Router } from "express";
import { ItemController } from "./controller";
import { JsonRepository } from "./repository";

const repo = new JsonRepository();
const controller = new ItemController(repo);
const router = Router();




router.post("/adimidPatient", controller.adimidPatient);
// router.post("/", controller.create);
// router.get("/", controller.getAll);
// router.get("/:id", controller.getById);
// router.put("/:id", controller.update);
// router.delete("/:id", controller.delete);

export default router;
