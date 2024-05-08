import axios from "axios";
import { AxiosResponse } from "axios";
import ErrorHandler from "../middlewares/errorHandler";
import { blandAiprompt, blandAITask } from "../utils/prompts";
import { bookAppointmentTool } from "../utils/blandAITools";
import { getAvilableDates } from "../utils/dynamicData";

interface PromptDetails {
  name: string;
  phone: string;
  email: string;
}

interface StartCallBody {
  phone_number: string;
  task: string;
  record: boolean;
  voice: string;
  tools: [{}];
  dynamic_data: [{}];
}

export const startCall = async (promptDetails: PromptDetails, headers: {}) => {
  try {
    const body: StartCallBody = {
      task: blandAiprompt(promptDetails.email, promptDetails.name),
      phone_number: promptDetails.phone,
      record: true,
      voice: "ryan",
      tools: [bookAppointmentTool],
      dynamic_data: [getAvilableDates],
    };

    const call = await axios.post("https://api.bland.ai/v1/calls", body, {
      headers,
    });

    return call.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message?.startsWith("Invalid phone number")) {
        throw new ErrorHandler(400, "Invalid phone number");
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};
