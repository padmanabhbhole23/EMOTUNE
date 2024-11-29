import { useState, useRef } from "react";

const EmotionBasedMusicRecommender = () => {
  const [emotion, setEmotion] = useState(""); // Store the detected emotion
  const [songs, setSongs] = useState([]); // Store recommended songs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start video stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // Capture image from video
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png"); // Image data as base64
      analyzeEmotion(imageData); // Send image for emotion analysis
    }
  };

  // Analyze emotion using the API (via backend)
  const analyzeEmotion = async (imageData) => {
    try {
      const response = await fetch("http://localhost:5000/api/emotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();
      if (data.emotion) {
        setEmotion(data.emotion); // Update emotion state
        recommendSongs(data.emotion); // Fetch recommended songs
      } else {
        console.error("Emotion analysis failed:", data.error);
      }
    } catch (err) {
      console.error("Error analyzing emotion:", err);
    }
  };

  // Fetch song recommendations based on the detected emotion
  const recommendSongs = async (detectedEmotion) => {
    try {
      const response = await fetch(`http://localhost:5000/api/recommend?s=${detectedEmotion}`);
      const data = await response.json();
      setSongs(data.songs);
    } catch (err) {
      console.error("Error fetching song recommendations:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Emotion Based Music Recommender</h1>
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", maxWidth: "500px", margin: "10px auto", border: "1px solid black" }}
        ></video>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
        ></canvas>
      </div>
      <button onClick={startCamera} style={{ margin: "10px" }}>
        Start Camera
      </button>
      <button onClick={captureImage} style={{ margin: "10px" }}>
        Capture and Analyze
      </button>
      {emotion && <h2>Detected Emotion: {emotion}</h2>}
      {songs.length > 0 && (
        <div>
          <h3>Recommended Songs:</h3>
          <ul>
            {songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmotionBasedMusicRecommender;
