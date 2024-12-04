// eslint-disable-next-line no-unused-vars
import React from "react";
import "./appli.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Emotune</div>
    
      <button className="login-button">Log In</button>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="hero">
      <h1>Listen to Emotion, Anywhere</h1>
      <p>Millions of songs. No credit card needed.</p>
      <button className="cta-button">Get Spotify Free</button>
    </div>
  );
};

const EmotionScanner = () => {
  const handleScan = () => {
    alert("Scanning face for emotions... (Feature coming soon!)");
    // Integration with a real emotion detection library/API would go here.
  };

  return (
    <div className="emotion-scanner">
      <h2>Scan Your Face</h2>
      <p>Get your current emotion details instantly!</p>
      <button onClick={handleScan} className="scan-button">Scan Now</button>
    </div>
  );
};

const FeaturedPlaylists = () => {
  const playlists = [
    { image: "https://via.placeholder.com/150", title: "Top Hits" },
    { image: "https://via.placeholder.com/150", title: "Workout Mix" },
    { image: "https://via.placeholder.com/150", title: "Chill Vibes" },
    { image: "https://via.placeholder.com/150", title: "Party Tunes" },
  ];

  return (
    <div className="playlists">
      <h2>Featured Playlists</h2>
      <div className="playlist-grid">
        {playlists.map((playlist, index) => (
          <div key={index} className="card">
            <img src={playlist.image} alt={playlist.title} />
            <h3>{playlist.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const Appi = () => {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <EmotionScanner />
      <FeaturedPlaylists />
    </div>
  );
};

export default Appi