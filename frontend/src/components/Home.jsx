import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <main className="grid-container">
                <section className="box large-box">Emergency Alerts</section>
                <section className="box small-box">Upcoming Event</section>
                <section className="box large-box">Lost Pets</section>
                <section className="box small-box">Latest News</section>
                <section className="box large-box">Marketplace</section>
                <section className="box small-box">Weather</section>
            </main>
        </div>
    );
};

export default Home;