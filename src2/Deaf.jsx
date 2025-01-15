import React, { useState } from "react";

const Deaf = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions((prev) => !prev);
  };

  const styles = {
    body: {
      backgroundImage: "url('/bg10.jpg')", // Path to image in public folder
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      color: "white",
      fontWeight: "bold",
    },
    container: {
      display: "flex",
      alignItems: "center",
      padding: "20px",
    },
    image: {
      flex: 1,
      marginRight: "20px",
    },
    img: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "10px",
    },
    content: {
      flex: 2,
    },
    heading: {
      fontSize: "2em",
      marginBottom: "10px",
    },
    paragraph: {
      fontSize: "1.2em",
      color: "black",
    },
    reverseContainer: {
      display: "flex",
      alignItems: "center",
      padding: "20px",
      flexDirection: "row-reverse",
    },
    imageRow: {
      display: "flex",
      justifyContent: "space-around",
      padding: "20px",
      flexWrap: "wrap",
    },
    rowImg: {
      width: "200px",
      height: "auto",
      borderRadius: "10px",
      margin: "10px",
    },
    separator: {
      height: "2px",
      backgroundColor: "black",
      margin: "20px 0",
      width: "100%",
    },
    middleParagraph: {
      flex: 1,
      textAlign: "center",
      padding: "20px",
    },
    sideImages: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    optionsButton: {
      backgroundColor: "#8a2be2",
      color: "white",
      border: "none",
      padding: "10px 20px",
      fontSize: "1.2em",
      cursor: "pointer",
      borderRadius: "5px",
      marginTop: "20px",
    },
    optionsList: {
      marginTop: "20px",
      textAlign: "center",
    },
    optionLink: {
      display: "block",
      color: "#8a2be2",
      textDecoration: "none",
      fontSize: "1.2em",
      margin: "10px 0",
    },
  };

  return (
    <div style={styles.body}>
      {/* First Section */}
      <div style={styles.container}>
        <div style={styles.image}>
          <img
            src="/deafstart.jpg" // Path to image in public folder
            alt="Deaf community representation"
            style={styles.img}
          />
        </div>
        <div style={styles.content}>
          <h1 style={styles.heading}>Deaf Community</h1>
          <p style={styles.paragraph}>
            This page provides details about the deaf community and their
            stories.
          </p>
        </div>
      </div>

      {/* Button to Toggle Options */}
      <div style={{ textAlign: "center" }}>
        <button style={styles.optionsButton} onClick={handleButtonClick}>
          {showOptions ? "Hide Options" : "Explore More"}
        </button>
      </div>

      {/* Options List */}
      {showOptions && (
        <div style={styles.optionsList}>
          <a href="/deaf4" style={styles.optionLink}>
            ABC playtime
          </a>
          <a href="/deaf2" style={styles.optionLink}>
            Learn Signs
          </a>
          <a href="/deaf3" style={styles.optionLink}>
            Test Your Signs
          </a>
        </div>
      )}

      {/* Second Section */}
      <div style={styles.reverseContainer}>
        <div style={styles.image}>
          <img
            src="/deaf12.jpg" // Path to image in public folder
            alt="Awareness representation"
            style={styles.img}
          />
        </div>
        <div style={styles.content}>
          <h1 style={styles.heading}>Deaf Awareness</h1>
          <p style={styles.paragraph}>
            This section focuses on the importance of raising awareness and
            providing support for the deaf community.
          </p>
        </div>
      </div>

      {/* Short Paragraph */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={styles.paragraph}>
          Here are some visual representations of the vibrant deaf community,
          showcasing their strength, resilience, and unity.
        </p>
      </div>

      {/* Row of Images */}
      <div style={styles.imageRow}>
        <img
          src="/deaf16.jpg" // Path to image in public folder
          alt="Community gathering"
          style={styles.rowImg}
        />
        <img
          src="/deaf17.jpg" // Path to image in public folder
          alt="Support event"
          style={styles.rowImg}
        />
        <img
          src="/deaf19.jpg" // Path to image in public folder
          alt="Artistic expression"
          style={styles.rowImg}
        />
        <img
          src="/deaf20.jpg" // Path to image in public folder
          alt="Celebration event"
          style={styles.rowImg}
        />
      </div>

      {/* Separator Line */}
      <div style={styles.separator}></div>

      {/* Paragraph Before the Last Row */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={styles.paragraph}>
          Below are additional images highlighting the experiences and
          perspectives of the deaf community. These visuals reflect their
          culture, challenges, and achievements.
        </p>
      </div>

      {/* New Row of deaf5.jpg, deaf25.jpg, and deaf26.jpg */}
      <div style={styles.imageRow}>
        <img
          src="/deaf5.jpg" // Path to image in public folder
          alt="Cultural event"
          style={styles.rowImg}
        />
        <img
          src="/deaf25.jpg" // Path to image in public folder
          alt="Community support"
          style={styles.rowImg}
        />
        <img
          src="/deaf26.jpg" // Path to image in public folder
          alt="Personal story"
          style={styles.rowImg}
        />
      </div>

      {/* Separator Line */}
      <div style={styles.separator}></div>

      {/* New Section with deaf8.jpg and deaf9.jpg */}
      <div style={styles.container}>
        <div style={styles.sideImages}>
          <img
            src="/deaf8.jpg" // Path to image in public folder
            alt="Unity"
            style={styles.img}
          />
        </div>
        <div style={styles.middleParagraph}>
          <p style={styles.paragraph}>
            The images represent various aspects of life within the deaf
            community, highlighting their culture, unity, and contributions to
            society.
          </p>
        </div>
        <div style={styles.sideImages}>
          <img
            src="/deaf9.jpg" // Path to image in public folder
            alt="Community engagement"
            style={styles.img}
          />
        </div>
      </div>

      {/* Separator Line */}
      <div style={styles.separator}></div>

      {/* New Section with deaf29.jpg and deaf30.jpg */}
      <div style={styles.container}>
        <div style={styles.sideImages}>
          <img
            src="/deaf29.jpg" // Path to image in public folder
            alt="Cultural celebration"
            style={styles.img}
          />
        </div>
        <div style={styles.middleParagraph}>
          <p style={styles.paragraph}>
            The images represent various aspects of life within the deaf
            community, highlighting their culture, unity, and contributions to
            society.
          </p>
        </div>
        <div style={styles.sideImages}>
          <img
            src="/deaf30.jpg" // Path to image in public folder
            alt="Event gathering"
            style={styles.img}
          />
        </div>
      </div>

      {/* Separator Line */}
      <div style={styles.separator}></div>
    </div>
  );
};

export default Deaf;
