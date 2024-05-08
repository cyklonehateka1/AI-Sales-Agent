import { Router } from "express";
import { availableSlots, scheduleAppointment } from "../controllers/calendar";

const router = Router();

router.post("/book-appointment", scheduleAppointment);
router.get("/available-slots", availableSlots);

export default router;
