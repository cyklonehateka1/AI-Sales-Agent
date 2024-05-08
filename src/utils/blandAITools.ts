export const bookAppointmentTool = {
  name: "BookAppointment",
  description: "Books an appointment for the customer",
  url: "https://localhost:8000/calendar/book-appointment",
  method: "POST",

  body: {
    startDate: "{{input.date}}",
    endDate: "{{input.time}}",
    name: "{{input.service}}",
    email: "{{input.email}}",
  },
  input_schema: {
    example: {
      speech:
        "Got it - one second while I book your appointment for tomorrow at 10 AM.",
      startDate: "2024-05-07T13:45:00",
      endDate: "2024-05-07T15:45:00",
      name: "Joseph Luxem",
      email: "example@gmail.com",
    },
    type: "object",
    properties: {
      speech: "string",
      startDate: "YYYY-MM-DDTHH:MM:SS",
      endDate: "YYYY-MM-DDTHH:MM:SS",
      name: "the name of the client",
      email: "the email of the client",
    },
  },
  response: {
    succesfully_booked_slot: "$.status",
  },
};
