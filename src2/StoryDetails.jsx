import React, { useState } from "react";

function StoryDetails() {
  const [userAnswers, setUserAnswers] = useState(Array(15).fill(""));
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

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

  const questions3 = [
    {
      question: "What does the bear love?",
      options: ["Grapes", "Honey", "Fruit"],
      answer: "Honey",
    },
    {
      question: "Where does the bear go?",
      options: ["Sea", "Forest", "Mountains"],
      answer: "Forest",
    },
    {
      question: "Where does the bee sting?",
      options: ["Nose", "Ear", "Leg"],
      answer: "Nose",
    },
  ];

  const questions4 = [
    {
      question: "درزی کی بیٹی کیا ہے؟",
      options: ["عید", "محبت", "دوستی"],
      answer: "محبت",
    },
    {
      question: "درزی کی بیٹی کی خاصیت کیا ہے؟",
      options: ["نرمی", "بہادری", "حسناکی"],
      answer: "حسناکی",
    },
    {
      question: "درزی کی بیٹی کہاں رہتی ہے؟",
      options: ["گاؤں", "شہر", "دریا کے کنارے"],
      answer: "گاؤں",
    },
  ];

  const questions5 = [
    {
      question: "ہاتھی کو کیا پسند ہے؟",
      options: ["انگور", "شہد", "پھل"],
      answer: "شہد",
    },
    {
      question: "ہاتھی کہاں جاتا ہے؟",
      options: ["سمندر", "جنگل", "پہاڑ"],
      answer: "جنگل",
    },
    {
      question: "شہد کی مکھی کہاں ڈنک مارتی ہے؟",
      options: ["ناک", "کان", "پاوں"],
      answer: "ناک",
    },
  ];

  const handleAnswerChange = (index, selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    const allQuestions = [
      ...questions1,
      ...questions2,
      ...questions3,
      ...questions4,
      ...questions5,
    ];
    return allQuestions.reduce((score, q, index) => {
      return score + (userAnswers[index] === q.answer ? 1 : 0);
    }, 0);
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    const totalQuestions =
      questions1.length +
      questions2.length +
      questions3.length +
      questions4.length +
      questions5.length;
    setFinalScore(`${score} out of ${totalQuestions}`);
    setShowModal(true);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: "url(bg.jpg)",
        backgroundSize: "cover",
        minHeight: "100vh",
        color: "black",
      }}
    >
      {/* Video Section - First Video (Replace YouTube Embed with MP4) */}
      <h2 style={{ textAlign: "center" }}>The fisherman and his wife</h2>
      <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <video
          width="100%"
          height="auto"
          controls
          style={{ display: "block", marginBottom: "20px" }}
        >
          <source src="ab2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Question Section After the First Video */}
      <h2 style={{ textAlign: "center" }}>Answer the Questions Below:</h2>
      <div style={{ marginTop: "20px" }}>
        {questions1.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h4>{q.question}</h4>
            {q.options.map((option, idx) => (
              <label key={idx} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`question1_${index}`}
                  value={option}
                  onChange={() => handleAnswerChange(index, option)}
                  checked={userAnswers[index] === option}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* YouTube Video Embed - Second Video */}
      <h2 style={{ textAlign: "center" }}>The little sparrow</h2>
      <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <video
          width="100%"
          height="auto"
          controls
          style={{ display: "block", marginBottom: "20px" }}
        >
          <source src="ab3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Question Section for Second Video */}
      <h2 style={{ textAlign: "center" }}>Answer the Questions Below:</h2>
      <div style={{ marginTop: "20px" }}>
        {questions2.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h4>{q.question}</h4>
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
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Video Section - Third Video */}
      <h2 style={{ textAlign: "center" }}>The bear</h2>
      <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <video
          width="100%"
          height="auto"
          controls
          style={{ display: "block", marginBottom: "20px" }}
        >
          <source src="ab10.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Question Section for Third Video */}
      <h2 style={{ textAlign: "center" }}>Answer the Questions Below:</h2>
      <div style={{ marginTop: "20px" }}>
        {questions3.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h4>{q.question}</h4>
            {q.options.map((option, idx) => (
              <label key={idx} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`question3_${index}`}
                  value={option}
                  onChange={() =>
                    handleAnswerChange(
                      index + questions1.length + questions2.length,
                      option
                    )
                  }
                  checked={
                    userAnswers[
                      index + questions1.length + questions2.length
                    ] === option
                  }
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Video Section - Fourth Video */}
      <h2 style={{ textAlign: "center" }}>درزی کی بیٹی</h2>
      <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <video
          width="100%"
          height="auto"
          controls
          style={{ display: "block", marginBottom: "20px" }}
        >
          <source src="ab1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Question Section for Fourth Video */}
      <h2 style={{ textAlign: "center" }}>Answer the Questions Below:</h2>
      <div style={{ marginTop: "20px" }}>
        {questions4.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h4>{q.question}</h4>
            {q.options.map((option, idx) => (
              <label key={idx} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`question4_${index}`}
                  value={option}
                  onChange={() =>
                    handleAnswerChange(
                      index +
                        questions1.length +
                        questions2.length +
                        questions3.length,
                      option
                    )
                  }
                  checked={
                    userAnswers[
                      index +
                        questions1.length +
                        questions2.length +
                        questions3.length
                    ] === option
                  }
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Video Section - Fifth Video */}
      <h2 style={{ textAlign: "center" }}>ہاتھی</h2>
      <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <video
          width="100%"
          height="auto"
          controls
          style={{ display: "block", marginBottom: "20px" }}
        >
          <source src="ab5.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Question Section for Fifth Video */}
      <h2 style={{ textAlign: "center" }}>Answer the Questions Below:</h2>
      <div style={{ marginTop: "20px" }}>
        {questions5.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h4>{q.question}</h4>
            {q.options.map((option, idx) => (
              <label key={idx} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`question5_${index}`}
                  value={option}
                  onChange={() =>
                    handleAnswerChange(
                      index +
                        questions1.length +
                        questions2.length +
                        questions3.length +
                        questions4.length,
                      option
                    )
                  }
                  checked={
                    userAnswers[
                      index +
                        questions1.length +
                        questions2.length +
                        questions3.length +
                        questions4.length
                    ] === option
                  }
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitQuiz}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit Quiz
      </button>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3>Your Score: {finalScore}</h3>
            <button
              onClick={() => setShowModal(false)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
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

export default StoryDetails;
