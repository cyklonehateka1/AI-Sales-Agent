export const getAvilableDates = {
  url: "https://localhost:8000/calendar/available-slots",
  method: "GET",
  cache: true,
  response_data: [
    {
      name: "availableslots",
      data: "$.slots",
      context:
        "The list of available slots in my calendar is {{availableslots}}",
    },
  ],
};
