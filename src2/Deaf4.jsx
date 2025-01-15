import React, { useState } from "react";

const Deaf4 = () => {
  const [videoCards, setVideoCards] = useState([
    { id: 1, url: "/deafv4.mp4", name: "Sign 1" },
    { id: 2, url: "/deafv2.mp4", name: "Sign 2" },
    { id: 3, url: "/deafv3.mp4", name: "Sign 3" },
    { id: 4, url: "/deafv1.mp4", name: "Sign 4" },
    { id: 5, url: "/deafv5.mp4", name: "Sign 5" },
    { id: 6, url: "/deafv6.mp4", name: "Sign 6" },
  ]);

  const wallpapers = ["/hy1.png", "/D2.png", "/hy2.png"];

  const images = [
    "/abc/1.png",
    "/abc/2.png",
    "/abc/3.png",
    "/abc/4.png",
    "/abc/5.png",
    "/abc/6.png",
    "/abc/7.png",
    "/abc/8.png",
    "/abc/9.png",
    "/abc/10.png",
    "/abc/11.png",
    "/abc/12.png",
    "/abc/13.png",
    "/abc/14.png",
    "/abc/15.png",
    "/abc/16.png",
    "/abc/17.png",
    "/abc/18.png",
    "/abc/19.png",
    "/abc/20.png",
    "/abc/21.png",
    "/abc/22.png",
    "/abc/23.png",
    "/abc/24.png",
    "/abc/25.png",
    "/abc/26.png",
  ];

  const styles = {
    container: {
      textAlign: "center",
      backgroundImage: "url(/D.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      paddingBottom: "20px",
    },
    videoCardRow: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: "20px",
    },
    videoCard: {
      width: "30%",
      margin: "10px",
      backgroundColor: "#fff",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    video: {
      width: "100%",
      height: "auto",
    },
    wallpaperRow: {
      display: "flex",
      justifyContent: "center",
      padding: "20px",
    },
    wallpaperImage: {
      width: "33.33%",
      height: "auto",
    },
    imagesRow: {
      display: "flex",
      justifyContent: "center",
      padding: "20px",
    },
    image: {
      width: "150px",
      height: "auto",
      margin: "0 10px",
    },
    welcomeMessage: {
      fontSize: "30px",
      fontWeight: "bold",
      background: "linear-gradient(to right, #ff7e5f, #feb47b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      margin: "40px 0 20px",
      textAlign: "center",
    },
    abcHeading: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#007bff",
      margin: "30px 0",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wallpaperRow}>
        {wallpapers.map((wallpaper, index) => (
          <img
            key={index}
            src={wallpaper}
            alt={`Wallpaper ${index + 1}`}
            style={styles.wallpaperImage}
          />
        ))}
      </div>

      <div style={styles.welcomeMessage}>
        Hey Minimind Users! Here are some videos you can enjoy and learn from!
      </div>

      {Array.from({ length: Math.ceil(videoCards.length / 3) }).map(
        (_, rowIndex) => (
          <div key={rowIndex} style={styles.videoCardRow}>
            {videoCards.slice(rowIndex * 3, rowIndex * 3 + 3).map((card) => (
              <div key={card.id} style={styles.videoCard}>
                <video src={card.url} controls style={styles.video} />
              </div>
            ))}
          </div>
        )
      )}

      <div style={styles.abcHeading}>
        Hey Kids! Let's Learn ABC Through Signs
      </div>

      {Array.from({ length: Math.ceil(images.length / 5) }).map(
        (_, rowIndex) => (
          <div key={rowIndex} style={styles.imagesRow}>
            {images
              .slice(rowIndex * 5, rowIndex * 5 + 5)
              .map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${rowIndex * 5 + index + 1}`}
                  style={styles.image}
                />
              ))}
          </div>
        )
      )}
    </div>
  );
};

export default Deaf4;
