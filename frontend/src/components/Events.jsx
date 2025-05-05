import React, { useState, useMemo } from "react";
import "./Events.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Badge, ThemeProvider, createTheme } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);

const getStoredEvents = () => {
  const stored = localStorage.getItem("events");
  const result = {};

  try {
    const parsed = stored ? JSON.parse(stored) : [];

    parsed.forEach((entry) => {
      const rawDate = entry.date.split("T")[0];
      const localDate = dayjs(rawDate).format("MM/DD/YYYY");
      if (!result[localDate]) result[localDate] = [];
      result[localDate].push(entry.description || "Untitled Event");
    });
  } catch (e) {
    console.error("Failed to parse events from localStorage:", e);
  }

  return result;
};

const Events = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const eventData = useMemo(() => getStoredEvents(), []);
  const formattedKey = selectedDate.format("MM/DD/YYYY");
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
                  transform: "scale(1.2)",
                  "& .MuiTypography-root": {
                    fontSize: "1.2rem",
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    fontSize: "1.2rem",
                    padding: "0 4px",
                  },
                  "& .MuiPickersDay-root": {
                    fontSize: "1rem",
                    width: "44px",
                    height: "44px",
                  },
                }}
                slots={{
                  day: (props) => {
                    const key = dayjs(props.day).format("MM/DD/YYYY");
                    const hasEvents = !!eventData[key];
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
          <h3>Events on {formattedKey}</h3>
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