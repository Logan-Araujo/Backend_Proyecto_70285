import mocksController from "../controllers/mocks.controller.js";
import { Router } from "express";
const router = Router();
 
router.get("/mockingusers", mocksController.getMockingUsers);
router.get("/mockingpets", mocksController.getMockingPets);
router.post("/generateData", mocksController.generateData);

export default router; 


