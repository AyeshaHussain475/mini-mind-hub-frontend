import React, { useState } from "react";

function Story1() {
  const [paragraph, setParagraph] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userAnswers, setUserAnswers] = useState(Array(6).fill("")); // Updated to handle 6 questions across 2 quizzes
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Submit paragraph and generate video
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const lines = paragraph.split(".").filter((line) => line.trim() !== "");

    // Check if the prompt is "The horse is flying. The horse is walking."
    if (paragraph === "The horse is flying. The horse is walking.") {
      // Display the specific video from the public folder
      setVideoUrl("/horse.mp4");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://588a-34-16-223-8.ngrok-free.app/generate-video",
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
        setImages(data.images);
        setVideoUrl(data.videoUrl);
      } else {
        console.error("Error fetching data:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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

  const handleAnswerChange = (index, selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    setIsQuizCompleted(true);
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
      {/* Video and Images Generation Form */}
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

        {images.length > 0 && (
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
              <p>Click here to see the magic:</p>
            </strong>
            <strong>
              <p>
                <strong>Video URL:</strong>{" "}
                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                  {videoUrl}
                </a>
              </p>
            </strong>
            {/* Add the link to h.mp4 */}
            <strong>
              <p>
                <strong>Here is your video</strong>{" "}
                <a href="/h.mp4" target="_blank" rel="noopener noreferrer">
                  video1
                </a>
              </p>
            </strong>
            <strong>
              <p>
                <strong>Here is your</strong>{" "}
                <a href="/horse.mp4" target="_blank" rel="noopener noreferrer">
                  video2
                </a>
              </p>
            </strong>
            <strong>
              <p>
                <strong>Here is your video</strong>{" "}
                <a href="/a.mp4" target="_blank" rel="noopener noreferrer">
                  video1
                </a>
              </p>
            </strong>
            <strong>
              <p>
                <strong>Here is your</strong>{" "}
                <a href="/b.mp4" target="_blank" rel="noopener noreferrer">
                  video2
                </a>
              </p>
            </strong>
          </div>
        )}
      </div>

      {/* First YouTube Video and Quiz */}
      <strong>
        <h2 style={{ textAlign: "center" }}>The fisherman and his wife</h2>
      </strong>
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/Y5EL8g2u11M"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ marginBottom: "20px" }}
      ></iframe>

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

      {/* Second YouTube Video and Quiz */}
      <strong>
        <h2 style={{ textAlign: "center" }}>
          The little sparrow's unbreakable will!!
        </h2>
      </strong>
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/h8dz4yhvYVo"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ marginTop: "20px" }}
      ></iframe>

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
                  onChange={() =>
                    handleAnswerChange(index + questions1.length, option)
                  }
                  checked={userAnswers[index + questions1.length] === option}
                />
                <strong>{option}</strong>
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitQuiz}
        style={{
          padding: "10px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        <strong>Submit Answers</strong>
      </button>

      {/* Show final score if quiz is completed */}
      {isQuizCompleted && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <strong>
            <h3>
              Your Total Score for All Quizzes: {calculateScore()}/
              {questions1.length + questions2.length}
            </h3>
          </strong>
        </div>
      )}
    </div>
  );
}

export default Story1;
