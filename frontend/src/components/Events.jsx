import React, { useState } from "react";
import "./Events.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Badge, ThemeProvider, createTheme } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { useNavigate } from "react-router-dom";

import { events as eventData } from "../data";

const Events = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Fix here: format selected date to MM/DD/YYYY to match eventData keys
  const formattedKey = selectedDate.format("MM/DD/YYYY");
  const formattedDateDisplay = selectedDate.format("MM/DD/YYYY");
  const eventsForDay = eventData[formattedKey] || ["No events for this day."];

  const muiTheme = createTheme({
    palette: {
      primary: { main: "#503047" },
      secondary: { main: "#FFDDF6" },
    },
    typography: {
      fontFamily: "Oxygen, sans-serif",
    },
  });

  return (
    <div className="events-container">
      <div className="events-content">
        <div className="events-calendar">
          <ThemeProvider theme={muiTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  minWidth: "340px",
                  transform: "scale(1.25)",
                  "& .MuiTypography-root": {
                    fontSize: "1.2rem",
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    fontSize: "1rem",
                  },
                  "& .MuiPickersDay-root": {
                    fontSize: "1rem",
                    width: "44px",
                    height: "44px",
                  },
                }}
                slots={{
                  day: (props) => {
                    const dayKey = dayjs(props.day).format("MM/DD/YYYY"); // ✅ lookup key fixed
                    const hasEvents = !!eventData[dayKey];
                    return (
                      <Badge
                        color="primary"
                        variant="dot"
                        overlap="circular"
                        invisible={!hasEvents}
                      >
                        <PickersDay {...props} />
                      </Badge>
                    );
                  },
                }}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>

        <div className="events-details">
          <h3>Events on {formattedDateDisplay}</h3>
          <ul className="event-list">
            {eventsForDay.map((event, i) => (
              <li key={i}>{event}</li>
            ))}
          </ul>
          <div className="event-actions">
            <button
              className="event-btn"
              onClick={() => navigate("/add", { state: { from: "events" } })}
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
