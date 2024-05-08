import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import { getBookedDates, findAvailableSlots } from "../services/calendar";
import { bookAppointment } from "../services/calendar";

export const availableSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slots = await findAvailableSlots();
    res.json(slots).status(200);
  } catch (error) {
    return next(error);
  }
};

interface MeetingDetails {
  name: string;
  email: string;
  startDate: string;
  endDate: string;
}

export const scheduleAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const meetingDetails: MeetingDetails = {
      name: req.body.name,
      email: req.body.email,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };

    const appointment = await bookAppointment(meetingDetails);

    // console.log(bookAppointment);
    res.status(200).json({ status: appointment });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
