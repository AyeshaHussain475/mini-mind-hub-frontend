import React, { useState } from "react";

// Deaf2 component with CSS styles embedded in the component
const Deaf2 = () => {
  // Define CSS styles as a JavaScript object
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Center align the children horizontally
      width: "100%",
      backgroundColor: "white",
      overflowY: "auto", // Ensure content is scrollable if needed
      paddingBottom: "20px",
    },
    imageRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      width: "100%", // Make the row span the full width
    },
    mainImage: {
      width: "33.33%", // Each image takes one-third of the screen width
      height: "auto", // Maintain aspect ratio
      objectFit: "cover", // Ensure the images cover the available space
    },
    rowContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      flexWrap: "wrap", // Wrap the images on smaller screens
    },
    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "10px", // Add margin between images
    },
    rowImage: {
      width: "200px", // Set a fixed width for each image
      height: "auto",
      borderRadius: "10px", // Optional: make the images rounded
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
      gap: "0px", // Remove space between buttons
    },
    button: {
      padding: "5px 10px", // Adjust padding for smaller buttons
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "12px",
      backgroundColor: "transparent", // Start with transparent background
      transition: "transform 0.2s ease, background-color 0.3s ease", // Smooth transition for hover and click effects
    },
    heart: (liked) => ({
      color: liked ? "#ff6b6b" : "black", // Red if liked, black outline otherwise
      transform: liked ? "scale(1.2)" : "scale(1)", // Scale effect when liked
    }),
    thumbsUp: (upvoted) => ({
      color: upvoted ? "#4CAF50" : "gray", // Green if upvoted, gray otherwise
      transform: upvoted ? "scale(1.2)" : "scale(1)", // Scale effect when upvoted
    }),
    download: {
      padding: "5px 10px", // Smaller download button
      backgroundColor: "#3498db", // Blue for download button
      color: "white",
    },
    text: {
      color: "white", // White text to stand out against the dark blue background
      textAlign: "center",
      marginTop: "20px",
    },
  };

  // State to manage liked and upvoted status for each image
  const [likes, setLikes] = useState(Array(40).fill(false)); // Assuming 40 images
  const [upvotes, setUpvotes] = useState(Array(40).fill(false));

  // Handle heart icon click
  const toggleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);
  };

  // Handle thumbs-up icon click
  const toggleUpvote = (index) => {
    const newUpvotes = [...upvotes];
    newUpvotes[index] = !newUpvotes[index];
    setUpvotes(newUpvotes);
  };

  // Function to download the image
  const downloadImage = (src) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop(); // Extract image name from the path
    link.click();
  };

  // Image array with 40 images located in the public folder
  const images = [
    "/deaf33.PNG",
    "/deaf34.PNG",
    "/deaf36.PNG",
    "/deaf37.PNG",
    "/deaf82.PNG",
    "/deaf81.PNG",
    "/deaf40.PNG",
    "/deaf41.PNG",
    "/deaf42.PNG",
    "/deaf43.PNG",
    "/deaf44.PNG",
    "/deaf45.PNG",
    "/deaf46.PNG",
    "/deaf47.PNG",
    "/deaf48.PNG",
    "/deaf49.PNG",
    "/deaf50.PNG",
    "/deaf76.PNG",
    "/deaf79.PNG",
    "/deaf80.PNG",
    "/deaf74.PNG",
    "/deaf75.PNG",
    "/deaf58.PNG",
    "/deaf57.PNG",
    "/deaf59.PNG",
    "/deaf60.PNG",
    "/deaf61.PNG",
    "/deaf62.PNG",
    "/deaf63.PNG",
    "/deaf64.PNG",
    "/deaf65.PNG",
    "/deaf66.PNG",
    "/deaf67.PNG",
    "/deaf68.PNG",
    "/deaf69.PNG",
    "/deaf70.PNG",
    "/deaf71.PNG",
    "/deaf72.PNG",
    "/deaf73.PNG",
    "/deaf74.PNG",
  ];

  return (
    <div style={styles.container}>
      {/* Display 1.png, 2.png, 3.png in a row as wallpaper-style images */}
      <div style={styles.imageRow}>
        <img src="/1.png" alt="1" style={styles.mainImage} />
        <img src="/2.png" alt="2" style={styles.mainImage} />
        <img src="/3.png" alt="3" style={styles.mainImage} />
      </div>

      {/* Text below the main image row */}
      <p style={styles.text}>
        Welcome to our collection of sign language images! Here, you can explore
        various expressions and gestures.
      </p>

      {/* Rows of Images */}
      <div style={styles.rowContainer}>
        {images.map((src, index) => (
          <div key={index} style={styles.column}>
            <img
              src={src} // Direct reference to the public folder path
              alt={`Deaf Image ${index + 1}`}
              style={styles.rowImage}
            />

            {/* Interactive Buttons Below Each Image */}
            <div style={styles.buttonContainer}>
              {/* Heart Button */}
              <button
                style={{ ...styles.button, ...styles.heart(likes[index]) }}
                onClick={() => toggleLike(index)}
              >
                {likes[index] ? "❤️" : "🤍"}{" "}
                {/* Filled heart when liked, empty heart otherwise */}
              </button>

              {/* Thumbs-up Button */}
              <button
                style={{ ...styles.button, ...styles.thumbsUp(upvotes[index]) }}
                onClick={() => toggleUpvote(index)}
              >
                👍
              </button>

              {/* Download Button */}
              <button
                style={styles.download}
                onClick={() => downloadImage(src)}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deaf2;
