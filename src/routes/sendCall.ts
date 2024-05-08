import { Router } from "express";
import { makeCall } from "../controllers/sendCall";

const router = Router();

router.post("/sendcall", makeCall);

export default router;
