import Express from "express";
import { createEpic, getAllEpics } from "../controllers/taskboard.controller.js";

const router = Express.Router();

router.post('/create-epic', createEpic);
router.get('/get-epics', getAllEpics);

export default router;