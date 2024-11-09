import React, { useState } from 'react';

const Deaf3 = () => {
  const images = [
    { src: '/guess1.png', name: 'Finished' },
    { src: '/guess2.png', name: 'All done' },
    { src: '/guess3.png', name: 'Eat' },
    { src: '/guess4.png', name: 'Breakfast' },
    { src: '/guess5.png', name: 'Wake Up' },
    { src: '/guess6.png', name: 'Good Morning' },
    { src: '/guess7.png', name: 'Hello' },
    { src: '/guess8.png', name: 'Bye Bye' },
    { src: '/guess9.png', name: 'Outside' },
    { src: '/guess10.png', name: 'Where' },
  ];

  const [flipped, setFlipped] = useState(Array(images.length).fill(false));
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [flippedCount, setFlippedCount] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState('');
  const [showGuessPrompt, setShowGuessPrompt] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [guessInput, setGuessInput] = useState('');

  const handleCardClick = (index) => {
    if (!flipped[index]) {
      setCurrentIndex(index);
      setShowGuessPrompt(true);
    }
  };

  const handleGuessSubmit = () => {
    if (guessInput !== '') {
      const correctAnswer = images[currentIndex].name;
      setFlipped((prev) => {
        const newFlipped = [...prev];
        newFlipped[currentIndex] = true;
        return newFlipped;
      });
      setFlippedCount((prev) => prev + 1);

      if (guessInput.toLowerCase() === correctAnswer.toLowerCase()) {
        setCorrectCount((prev) => prev + 1);
        setPopupImage('/c1.jpg');
      } else {
        setWrongCount((prev) => prev + 1);
        setPopupImage('/c2.jpg');
      }
      setShowPopup(true);
      setShowGuessPrompt(false);
      setGuessInput('');
    }
  };

  const handleCancel = () => {
    setShowGuessPrompt(false);
    setGuessInput('');
  };

  const tryAgain = () => {
    setFlipped(Array(images.length).fill(false));
    setCorrectCount(0);
    setWrongCount(0);
    setFlippedCount(0);
    setShowStats(false);
    setShowPopup(false);
    setShowGuessPrompt(false);
    setGuessInput('');
  };

  const showStatistics = () => {
    setShowStats(true);
  };

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '20px',
    },
    flipCard: {
      backgroundColor: 'transparent',
      width: '300px',
      height: '400px',
      perspective: '1000px',
      margin: '20px',
      cursor: 'pointer',
    },
    flipCardInner: {
      position: 'relative',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      transition: 'transform 0.8s',
      transformStyle: 'preserve-3d',
    },
    flipped: {
      transform: 'rotateY(180deg)',
    },
    flipCardFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      borderRadius: '10px',
      overflow: 'hidden',
      backgroundColor: '#f0f0f0',
    },
    flipCardBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      borderRadius: '10px',
      overflow: 'hidden',
      backgroundColor: '#3498db',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'rotateY(180deg)',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    stats: {
      marginTop: '20px',
      fontSize: '18px',
      textAlign: 'center',
      backgroundColor: 'black',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      display: showStats ? 'block' : 'none',
      width: 'fit-content',
      margin: '0 auto',
    },
    popup: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
    button: {
      marginTop: '20px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#3498db',
      color: 'white',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'background-color 0.3s',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    wallpaper: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      padding: '20px',
    },
    wallpaperImage: {
      width: '33.33%',
      height: 'auto',
    },
  };

  return (
    <div>
      {/* Wallpaper row */}
      <div style={styles.wallpaper}>
        <img
          src='/tb.png'
          alt="Wallpaper 1"
          style={styles.wallpaperImage}
        />
        <img
          src='/tb3.png'
          alt="Wallpaper 2"
          style={styles.wallpaperImage}
        />
        <img
          src='/tb2.png'
          alt="Wallpaper 3"
          style={styles.wallpaperImage}
        />
      </div>

      <div style={styles.container}>
        {images.map((image, index) => (
          <div
            key={index}
            style={styles.flipCard}
            onClick={() => handleCardClick(index)}
          >
            <div
              style={{
                ...styles.flipCardInner,
                ...(flipped[index] ? styles.flipped : {}),
              }}
            >
              <div style={styles.flipCardFront}>
                <img
                  src={image.src}
                  alt={image.name}
                  style={styles.image}
                />
              </div>
              <div style={styles.flipCardBack}>
                <h2>{image.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div>
          <div style={styles.overlay} onClick={() => setShowPopup(false)} />
          <div style={styles.popup}>
            <h3>Guess the sign!</h3>
            <img
              src={popupImage}
              alt="Answer Feedback"
              style={{ width: '300px', height: 'auto', objectFit: 'contain' }}
            />
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      <button style={styles.button} onClick={tryAgain}>
        Try Again
      </button>
    </div>
  );
};

export default Deaf3;
