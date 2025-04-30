import React from "react";
import "./Home.css";
import { alerts, events, lostPets, marketplace } from "../data";
import { useNavigate } from "react-router-dom";
import Weather from "../components/Weather"; 



import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

const Home = () => {
    const today = dayjs().startOf("day");

  // Convert keys to actual dayjs objects, filter & sort properly
  const upcomingDates = Object.keys(events)
  .filter((date) => dayjs(date, "MM/DD/YYYY").startOf("day").isSameOrAfter(today))
  .sort(
    (a, b) =>
      dayjs(a, "MM/DD/YYYY").valueOf() - dayjs(b, "MM/DD/YYYY").valueOf()
  );

  const latestEventDate = upcomingDates[0];
  const latestEvent = latestEventDate ? events[latestEventDate][0] : null;


  const navigate = useNavigate();

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
          <h3 className="section-title">Latest News</h3>
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
        <h3 className="section-title">Weather</h3>
        <Weather />
        </section>
      </main>
    </div>
  );
};

export default Home;