import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import localforage from "localforage";

import Weather from "./Weather";
import News from "./News";

dayjs.extend(isSameOrAfter);

const getStoredData = async (key) => {
  try {
    const stored = await localforage.getItem(key);
    if (!stored) return [];

    let items;
    if (Array.isArray(stored)) {
      items = stored;
    } else if (typeof stored === "string") {
      items = JSON.parse(stored);
    } else if (typeof stored === "object") {
      items = Object.values(stored);
    } else {
      console.warn(`Unexpected type for ${key}:`, typeof stored);
      return [];
    }

    return items
      .slice()
      .reverse()
      .map((item, i) => {
        let imageUrl = item.image;
        if (item.image?.data && item.image?.contentType) {
          imageUrl = `data:${item.image.contentType};base64,${item.image.data}`;
        }
        return {
          id: item._id ?? i + 1,
          title: item.title || "Untitled",
          price: item.price?.toString() ?? "0",
          image: imageUrl,
          description: item.description || "",
          contact: item.email || "N/A",
        };
      });
  } catch (err) {
    console.error(`Error reading "${key}" from localforage:`, err);
    return [];
  }
};

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

const getUpcomingEvent = (eventsGrouped) => {
  const today = dayjs().startOf("day");
  const upcomingDates = Object.keys(eventsGrouped)
    .filter((date) => dayjs(date, "MM/DD/YYYY").isSameOrAfter(today))
    .sort(
      (a, b) =>
        dayjs(a, "MM/DD/YYYY").valueOf() - dayjs(b, "MM/DD/YYYY").valueOf()
    );
  const firstDate = upcomingDates[0];
  return firstDate
    ? { date: firstDate, description: eventsGrouped[firstDate][0] }
    : null;
};

const Home = () => {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState([]);
  const [lostPets, setLostPets] = useState([]);
  const [marketplace, setMarketplace] = useState([]);

  useEffect(() => {
    // fetch all three lists in parallel
    const loadAll = async () => {
      const [a, p, m] = await Promise.all([
        getStoredData("alerts"),
        getStoredData("lostPets"),
        getStoredData("marketplace"),
      ]);
      setAlerts(a);
      setLostPets(p);
      setMarketplace(m);
    };
    loadAll();
  }, []);

  const events = getStoredEvents();
  const upcomingEvent = getUpcomingEvent(events);
  const latestEventDate = upcomingEvent?.date ?? null;
  const latestEvent = upcomingEvent?.description ?? null;

  return (
    <div className="home-container">
      <main className="grid-container">
        {/* Emergency Alerts */}
        <section className="box large-box">
          <h3 className="section-title">Emergency Alerts</h3>
          <div className="post-grid">
            {alerts.slice(0, 4).map((alert, i) => (
              <div
                key={i}
                className={`post-tile ${
                  !alert.image ? "no-hover-if-text" : ""
                }`}
                onClick={() => navigate(`/alerts/${alert.id}`)}
              >
                {alert.image ? (
                  <>
                    <div className="image-wrapper">
                      <img src={alert.image} alt="Alert" />
                    </div>
                    <div className="post-overlay">
                      <p>{alert.title}</p>
                    </div>
                  </>
                ) : (
                  <div className="post-text-only">
                    <p>{alert.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Event */}
        <section className="box small-box">
          <h3 className="section-title">Upcoming Event</h3>
          <div className="upcoming-event-card">
            {latestEvent ? (
              <>
                <p className="event-date">
                  <strong>{latestEventDate}</strong>
                </p>
                <p className="event-description">{latestEvent}</p>
              </>
            ) : (
              <p className="event-description">
                No upcoming events at this time.
              </p>
            )}
          </div>
        </section>

        {/* Lost Pets */}
        <section className="box large-box">
          <h3 className="section-title">Lost Pets</h3>
          <div className="post-grid">
            {lostPets.slice(0, 4).map((pet, i) => (
              <div
                key={i}
                className="post-tile"
                onClick={() => navigate(`/lostpets/${pet.id}`)}
              >
                <div className="image-wrapper">
                  <img src={pet.image} alt={pet.title} />
                </div>
                <div className="post-overlay">
                  <p>{pet.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section className="box small-box">
          <News />
        </section>

        {/* Marketplace */}
        <section className="box large-box">
          <h3 className="section-title">Marketplace</h3>
          <div className="post-grid">
            {marketplace.slice(0, 4).map((item, i) => (
              <div
                key={i}
                className="post-tile"
                onClick={() => navigate(`/marketplace/${item.id}`)}
              >
                <div className="image-wrapper">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="post-overlay">
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weather */}
        <section className="box small-box">
          <Weather />
        </section>
      </main>
    </div>
  );
};

export default Home;