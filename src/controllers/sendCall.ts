import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../middlewares/errorHandler";

import { startCall } from "../services/sendCall";

interface MakeCallReqBody {
  trimedName: boolean;
  trimedEmail: boolean;
  trimedPhone: boolean;
}

// const { startCall } = new MakeCall();

export const makeCall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone)
    return next(new ErrorHandler(400, "All fields are required"));

  const reqBodyTrimed: MakeCallReqBody = {
    trimedName: name.trim() === "",
    trimedEmail: email.trim() === "",
    trimedPhone: phone.trim() === "",
  };

  const { trimedEmail, trimedName, trimedPhone } = reqBodyTrimed;

  if (phone.trim().length !== 13)
    return next(new ErrorHandler(400, "Invalid phone number"));

  if (trimedEmail || trimedName || trimedPhone)
    return next(new ErrorHandler(400, "No field can be make of spaces only"));

  interface PromptDetails {
    name: string;
    phone: string;
    email: string;
  }

  const headers = {
    Authorization: process.env.BLANDAI_API,
  };

  try {
    const promptDetails: PromptDetails = {
      email,
      phone,
      name,
    };

    const callId = await startCall(promptDetails, headers);
    res.json({ callId, message: "Call was successful", email }).status(200);
    console.log(callId);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
