import React from "react";

const Deaf4 = () => {
  // Array of wallpaper images
  const wallpapers = ["/hy1.png", "/hy3.png", "/hy2.png"];

  // Array of images in the abc folder (total of 26 images)
  const images = [
    "/1.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/5.png",
    "/6.png",
    "/7.png",
    "/8.png",
    "/9.png",
    "/10.png",
    "/11.png",
    "/12.png",
    "/13.png",
    "/14.png",
    "/15.png",
    "/16.png",
    "/17.png",
    "/18.png",
    "/19.png",
    "/20.png",
    "/21.png",
    "/22.png",
    "/23.png",
    "/24.png",
    "/25.png",
    "/26.png",
  ];

  const styles = {
    container: {
      textAlign: "center",
      backgroundImage: `url(/hy3.png)`, // Set background image directly
      backgroundSize: "cover", // Cover the whole container
      backgroundPosition: "center", // Center the image
      minHeight: "100vh", // Minimum height to cover the viewport
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
  };

  return (
    <div style={styles.container}>
      {/* Wallpaper row */}
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

      {/* Images rows */}
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
