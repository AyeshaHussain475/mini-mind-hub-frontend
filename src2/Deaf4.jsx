import React from "react";

const Deaf4 = () => {
  // Array of wallpaper images
  const wallpapers = ["/hy1.png", "/hy3.png", "/hy2.png"];

  // Array of images in the abc folder (total of 26 images)
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
      backgroundImage: `url(/hy3.png)`, // Direct path for background image
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
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
            key={`wallpaper-${index}`}
            src={wallpaper} // Direct path for wallpaper images
            alt={`Wallpaper ${index + 1}`}
            style={styles.wallpaperImage}
          />
        ))}
      </div>

      {/* Images rows */}
      {Array.from({ length: Math.ceil(images.length / 5) }).map(
        (_, rowIndex) => (
          <div key={`row-${rowIndex}`} style={styles.imagesRow}>
            {images
              .slice(rowIndex * 5, rowIndex * 5 + 5)
              .map((image, index) => (
                <img
                  key={`image-${rowIndex * 5 + index}`}
                  src={image} // Direct path for abc images
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
