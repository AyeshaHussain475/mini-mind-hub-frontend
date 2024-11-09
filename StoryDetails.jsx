import React, { useState } from 'react';

function StoryDetails() {
    const [userAnswers, setUserAnswers] = useState(Array(15).fill(''));
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    const questions1 = [
        { question: "Where did the fisherman used to go?", options: ['Cottage', 'Seaside', 'Park'], answer: 'Seaside' },
        { question: "What was the color of the flounder?", options: ['Golden', 'Orange', 'Red'], answer: 'Golden' },
        { question: "What was the first wish of the fisherman?", options: ['Car', 'Home', 'Garden'], answer: 'Home' },
    ];

    const questions2 = [
        { question: "What did the little sparrow decorate?", options: ['Nest', 'Tree', 'Garden'], answer: 'Nest' },
        { question: "What destroyed the sparrow's nest?", options: ['Water waves', 'Volcano', 'Strong wind'], answer: 'Strong wind' },
        { question: "What was the name of the King of Birds?", options: ['Guruda', 'Narato', 'Solcates'], answer: 'Guruda' },
    ];

    const questions3 = [
        { question: "What does the bear love?", options: ['Grapes', 'Honey', 'Fruit'], answer: 'Honey' },
        { question: "Where does the bear go?", options: ['Sea', 'Forest', 'Mountains'], answer: 'Forest' },
        { question: "Where does the bee sting?", options: ['Nose', 'Ear', 'Leg'], answer: 'Nose' },
    ];

    const questions4 = [
        { question: "درزی کی بیٹی کیا ہے؟", options: ['عید', 'محبت', 'دوستی'], answer: 'محبت' },
        { question: "درزی کی بیٹی کی خاصیت کیا ہے؟", options: ['نرمی', 'بہادری', 'حسناکی'], answer: 'حسناکی' },
        { question: "درزی کی بیٹی کہاں رہتی ہے؟", options: ['گاؤں', 'شہر', 'دریا کے کنارے'], answer: 'گاؤں' },
    ];

    const questions5 = [
        { question: "ہاتھی کو کیا پسند ہے؟", options: ['انگور', 'شہد', 'پھل'], answer: 'شہد' },
        { question: "ہاتھی کہاں جاتا ہے؟", options: ['سمندر', 'جنگل', 'پہاڑ'], answer: 'جنگل' },
        { question: "شہد کی مکھی کہاں ڈنک مارتی ہے؟", options: ['ناک', 'کان', 'پاوں'], answer: 'ناک' },
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
        const allQuestions = [...questions1, ...questions2, ...questions3, ...questions4, ...questions5];
        return allQuestions.reduce((score, q, index) => {
            return score + (userAnswers[index] === q.answer ? 1 : 0);
        }, 0);
    };

    return (
        <div style={{ padding: '20px', backgroundImage: 'url(bg.jpg)', backgroundSize: 'cover', minHeight: '100vh', color: 'black' }}>
            {/* YouTube Video Embed - First Video */}
            <h2 style={{ textAlign: 'center' }}>The fisherman and his wife</h2>
            <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/Y5EL8g2u11M" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ marginBottom: '20px' }}
            ></iframe>

            {/* Question Section After the First Video */}
            <h2 style={{ textAlign: 'center' }}>Answer the Questions Below:</h2>
            <div style={{ marginTop: '20px' }}>
                {questions1.map((q, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h4>{q.question}</h4>
                        {q.options.map((option, idx) => (
                            <label key={idx} style={{ display: 'block' }}>
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
                <button
                    onClick={handleSubmitQuiz}
                    style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Submit Answers
                </button>
            </div>

            {/* Show final score if quiz is completed */}
            {isQuizCompleted && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h3>Your Score for the First Quiz: {calculateScore()}/{questions1.length}</h3>
                </div>
            )}

            {/* YouTube Video Embed - Second Video Below Questions */}
            <h2 style={{ textAlign: 'center' }}>The little sparrow's unbreakable will!!</h2>
            <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/h8dz4yhvYVo" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ marginTop: '20px' }}
            ></iframe>

            {/* New Questions Below the Second Video */}
            <h2 style={{ textAlign: 'center' }}>Answer the Questions Below:</h2>
            <div style={{ marginTop: '20px' }}>
                {questions2.map((q, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h4>{q.question}</h4>
                        {q.options.map((option, idx) => (
                            <label key={idx} style={{ display: 'block' }}>
                                <input
                                    type="radio"
                                    name={`question2_${index}`}
                                    value={option}
                                    onChange={() => handleAnswerChange(index + questions1.length, option)}
                                    checked={userAnswers[index + questions1.length] === option}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button
                    onClick={handleSubmitQuiz}
                    style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Submit Answers
                </button>
            </div>

            {/* Show final score if quiz is completed for second video */}
            {isQuizCompleted && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h3>Your Total Score for First and Second Quizzes: {calculateScore()}/{questions1.length + questions2.length}</h3>
                </div>
            )}

            {/* YouTube Video Embed - Third Video Below Second Video Questions */}
            <h2 style={{ textAlign: 'center' }}>The bear and the bear</h2>
            <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/jKi2SvWOCXc" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ marginTop: '20px' }}
            ></iframe>

            {/* New Questions Below the Third Video */}
            <h2 style={{ textAlign: 'center' }}>Answer the Questions Below:</h2>
            <div style={{ marginTop: '20px' }}>
                {questions3.map((q, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h4>{q.question}</h4>
                        {q.options.map((option, idx) => (
                            <label key={idx} style={{ display: 'block' }}>
                                <input
                                    type="radio"
                                    name={`question3_${index}`}
                                    value={option}
                                    onChange={() => handleAnswerChange(index + questions1.length + questions2.length, option)}
                                    checked={userAnswers[index + questions1.length + questions2.length] === option}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button
                    onClick={handleSubmitQuiz}
                    style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Submit Answers
                </button>
            </div>

            {/* Show final score if quiz is completed for third video */}
            {isQuizCompleted && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h3>Your Total Score for All Quizzes: {calculateScore()}/{questions1.length + questions2.length + questions3.length}</h3>
                </div>
            )}

            {/* New Video for درزی کی بیٹی Below the Third Video */}
            <h2 style={{ textAlign: 'center' }}>درزی کی بیٹی</h2>
            <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/M877Nn1hk5E" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ marginTop: '20px' }}
            ></iframe>

            {/* New Questions Below the درزی کی بیٹی Video */}
            <h2 style={{ textAlign: 'center' }}>Answer the Questions Below:</h2>
            <div style={{ marginTop: '20px' }}>
                {questions4.map((q, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h4>{q.question}</h4>
                        {q.options.map((option, idx) => (
                            <label key={idx} style={{ display: 'block' }}>
                                <input
                                    type="radio"
                                    name={`question4_${index}`}
                                    value={option}
                                    onChange={() => handleAnswerChange(index + questions1.length + questions2.length + questions3.length, option)}
                                    checked={userAnswers[index + questions1.length + questions2.length + questions3.length] === option}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button
                    onClick={() => handleSubmitQuiz(3)}
                    style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Submit Answers
                </button>
            </div>

            {/* Show final score if quiz is completed for fourth video */}
            {isQuizCompleted && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h3>Your Total Score for All Quizzes: {calculateScore()}/{questions1.length + questions2.length + questions3.length + questions4.length}</h3>
                </div>
            )}

            {/* New Video for ہاتھی اور چونٹی */}
            <h2 style={{ textAlign: 'center' }}>ہاتھی اور چونٹی</h2>
            <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/kyKTo2SilqM" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ marginTop: '20px' }}
            ></iframe>

            {/* Questions for ہاتھی اور چونٹی */}
            <h2 style={{ textAlign: 'center' }}>Answer the Questions Below:</h2>
            <div style={{ marginTop: '20px' }}>
                {questions5.map((q, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h4>{q.question}</h4>
                        {q.options.map((option, idx) => (
                            <label key={idx} style={{ display: 'block' }}>
                                <input
                                    type="radio"
                                    name={`question5_${index}`}
                                    value={option}
                                    onChange={() => handleAnswerChange(index + questions1.length + questions2.length + questions3.length + questions4.length, option)}
                                    checked={userAnswers[index + questions1.length + questions2.length + questions3.length + questions4.length] === option}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button
                    onClick={() => handleSubmitQuiz(4)}
                    style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Submit Answers
                </button>
            </div>

            {/* Show final score for the last set of questions */}
            {isQuizCompleted && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h3>Your Total Score for All Quizzes: {calculateScore()}/{questions1.length + questions2.length + questions3.length + questions4.length + questions5.length}</h3>
                </div>
            )}
        </div>
    );
}

export default StoryDetails;
