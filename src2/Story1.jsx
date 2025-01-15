import React, { useState, useRef } from "react";

function App() {
  const [paragraph, setParagraph] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(6).fill(""));
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const videoRefs = useRef([]);

  // Submit paragraph and generate video
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const lines = paragraph.split(".").filter((line) => line.trim() !== "");

    try {
      const response = await fetch(
        "https://7ebe-34-125-112-5.ngrok-free.app/generate-video",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompts: lines }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setImages(data.images || []);
        setVideoUrl(data.videoUrl || "");
      } else {
        console.error("Error fetching data:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index, selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    setFinalScore(score);
    setIsQuizCompleted(true);
    setShowModal(true);
  };

  const calculateScore = () => {
    const allQuestions = [...questions1, ...questions2];
    let score = 0;
    allQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        score += 1;
      }
    });
    return score;
  };

  const handleVideoClick = (index) => {
    const videoElement = videoRefs.current[index];
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  // Quiz questions
  const questions1 = [
    {
      question: "Where did the fisherman used to go?",
      options: ["Cottage", "Seaside", "Park"],
      answer: "Seaside",
    },
    {
      question: "What was the color of the flounder?",
      options: ["Golden", "Orange", "Red"],
      answer: "Golden",
    },
    {
      question: "What was the first wish of the fisherman?",
      options: ["Car", "Home", "Garden"],
      answer: "Home",
    },
  ];

  const questions2 = [
    {
      question: "What did the little sparrow decorate?",
      options: ["Nest", "Tree", "Garden"],
      answer: "Nest",
    },
    {
      question: "What destroyed the sparrow's nest?",
      options: ["Water waves", "Volcano", "Strong wind"],
      answer: "Strong wind",
    },
    {
      question: "What was the name of the King of Birds?",
      options: ["Guruda", "Narato", "Solcates"],
      answer: "Guruda",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: "url(bg7.jpg)",
        backgroundSize: "cover",
        minHeight: "100vh",
        color: "black",
      }}
    >
      {/* Image Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <img
          src="/muniba1.png"
          alt="First"
          style={{ width: "30%", borderRadius: "10px" }}
        />
        <img
          src="/muniba2.png"
          alt="Second"
          style={{ width: "30%", borderRadius: "10px" }}
        />
        <img
          src="/muniba3.png"
          alt="Third"
          style={{ width: "30%", borderRadius: "10px" }}
        />
      </div>

      {/* Generate Video from Paragraph Section */}
      <div
        className="App"
        style={{
          backgroundImage: "url(bg8.jpg)",
          backgroundSize: "cover",
          padding: "20px",
          minHeight: "50vh",
        }}
      >
        <strong>
          <h1>Generate Video from Paragraph</h1>
        </strong>
        <form onSubmit={handleSubmit}>
          <div>
            <strong>
              <label>Enter a paragraph: </label>
            </strong>
            <textarea
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              placeholder="Enter your paragraph."
              rows={5}
              style={{ width: "100%" }}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? (
              <strong>Generating Video...</strong>
            ) : (
              <strong>Generate Video</strong>
            )}
          </button>
        </form>

        {Array.isArray(images) && images.length > 0 && (
          <div>
            <strong>
              <h2>Generated Images</h2>
            </strong>
            {images.map((imgUrl, index) => (
              <div key={index}>
                <strong>
                  <p>Click here to see the magic:</p>
                </strong>
                <strong>
                  <p>
                    <strong>Image URL:</strong>{" "}
                    <a href={imgUrl} target="_blank" rel="noopener noreferrer">
                      {imgUrl}
                    </a>
                  </p>
                </strong>
              </div>
            ))}
          </div>
        )}

        {videoUrl && (
          <div>
            <strong>
              <h2>Generated Video</h2>
            </strong>
            <strong>
              <p>Click here to view the video:</p>
            </strong>
            <strong>
              <p>
                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                  View Video Slideshow
                </a>
              </p>
            </strong>
          </div>
        )}
      </div>

      {/* Sample Videos Section */}
      <h2
        style={{
          fontWeight: "bold",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        Some of the Sample Videos You Can Enjoy!
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {[
          "a.mp4",
          "h.mp4",
          "b.mp4",
          "c.mp4",
          "e.mp4",
          "horse.mp4",
          "t.mp4",
          "l.mp4",
          "m.mp4",
        ].map((video, index) => (
          <video
            key={index}
            ref={(el) => (videoRefs.current[index] = el)}
            controls
            style={{
              width: "30%",
              maxWidth: "300px",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => handleVideoClick(index)}
          >
            <source src={`/${video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>

      {/* First Video Section */}
      <strong>
        <h2 style={{ textAlign: "center" }}>The fisherman and his wife</h2>
      </strong>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <video
          width="60%"
          height="auto"
          controls
          style={{ marginBottom: "20px" }}
        >
          <source src="/ab2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <strong>
        <h2 style={{ textAlign: "center" }}>Answer the Questions Below:</h2>
      </strong>
      <div style={{ marginTop: "20px" }}>
        {questions1.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <strong>
              <h4>{q.question}</h4>
            </strong>
            {q.options.map((option, idx) => (
              <label key={idx} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`question1_${index}`}
                  value={option}
                  onChange={() => handleAnswerChange(index, option)}
                  checked={userAnswers[index] === option}
                />
                <strong>{option}</strong>
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Second Video Section */}
      <strong>
        <h2 style={{ textAlign: "center" }}>
          The little sparrow's unbreakable will!!
        </h2>
      </strong>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <video
          width="60%"
          height="auto"
          controls
          style={{ marginBottom: "20px" }}
        >
          <source src="/ab3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <strong>
        <h2 style={{ textAlign: "center" }}>Answer the Questions Below:</h2>
      </strong>
      <div style={{ marginTop: "20px" }}>
        {questions2.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <strong>
              <h4>{q.question}</h4>
            </strong>
            {q.options.map((option, idx) => (
              <label key={idx} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`question2_${index}`}
                  value={option}
                  onChange={() => handleAnswerChange(index + 3, option)}
                  checked={userAnswers[index + 3] === option}
                />
                <strong>{option}</strong>
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Submit Quiz Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handleSubmitQuiz}
          style={{
            backgroundColor: "purple",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Submit Quiz
        </button>
      </div>

      {/* Quiz Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "999",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h2>Your Score: {finalScore} / 6</h2>
            <button
              onClick={() => setShowModal(false)}
              style={{
                backgroundColor: "purple",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
