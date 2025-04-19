import React, { useState } from 'react';
import './Events.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { Badge, ThemeProvider, createTheme } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';


const Events = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const dummyEvents = {
        '2025-04-22': ['Neighborhood Cleanup at 9 AM', 'Picnic at Central Park'],
        '2025-04-23': ['Town Hall Meeting at 7 PM'],
    };

    const formattedDate = selectedDate.format('YYYY-MM-DD');
    const events = dummyEvents[formattedDate] || ['No events for this day.'];

    const muiTheme = createTheme({
        palette: {
            primary: { main: '#503047' },
            secondary: { main: '#FFDDF6' },
        },
        typography: {
            fontFamily: 'Oxygen, sans-serif',
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
                                    width: '100%',
                                    maxWidth: '100%',
                                    minWidth: '340px',
                                    transform: 'scale(1.25)',
                                    '& .MuiTypography-root': {
                                        fontSize: '1.2rem',
                                    },
                                    '& .MuiDayCalendar-weekDayLabel': {
                                        fontSize: '1rem',
                                    },
                                    '& .MuiPickersDay-root': {
                                        fontSize: '1rem',
                                        width: '44px',
                                        height: '44px',
                                    }
                                }}
                                slots={{
                                    day: (props) => {
                                        const dateKey = dayjs(props.day).format('YYYY-MM-DD');
                                        const hasEvents = !!dummyEvents[dateKey];
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
                                    }
                                }}
                            />

                        </LocalizationProvider>
                    </ThemeProvider>
                </div>

                <div className="events-details">
                    <h3>Events on {formattedDate}</h3>
                    <ul className="event-list">
                        {events.map((event, i) => (
                            <li key={i}>{event}</li>
                        ))}
                    </ul>
                    <div className="event-actions">
                        <button className="event-btn">Add Event</button>
                        <button className="event-btn">Delete Event</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
