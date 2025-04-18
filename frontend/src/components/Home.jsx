import React from 'react';
import './Home.css';

const Home = () => {
    const existingImages = ['warning1.png', 'warning2.png', 'warning4.png', 'warning5.png'];

    return (
        <div className="home-container">
            <main className="grid-container">


                <section className="box large-box">
                    <h3 className="section-title">Emergency Alerts</h3>
                    <div className="post-grid">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const imageName = `warning${i + 1}.png`;
                            const hasImage = existingImages.includes(imageName);

                            return (
                                <div key={i} className={`post-tile ${!hasImage ? 'no-hover-if-text' : ''}`}>
                                    {hasImage ? (
                                        <>
                                            <div className="image-wrapper">
                                                <img src={`/img/${imageName}`} alt="Alert" />
                                            </div>
                                            <div className="post-overlay">
                                                <p>Gas leak reported on Elm St.</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="post-text-only">
                                            <p>Gas leak reported on Elm St.</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                
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