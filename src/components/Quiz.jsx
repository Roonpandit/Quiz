import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const quizQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
    if (quizQuestions) {
      setQuestions(quizQuestions);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
    }
  };

  const feedbackClass = (option) => {
    if (selectedAnswer) {
      if (option === questions[currentQuestionIndex].correct_answer) return 'green';
      if (option === selectedAnswer) return 'red';
    }
    return '';
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      if (currentQuestionIndex === questions.length - 1) {
        setShowConfirmationPopup(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      }
    }
  };

  const handleFinishQuiz = () => {
    const totalQuestions = questions.length;
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
    setScore(percentage);

    const userName = JSON.parse(localStorage.getItem('quizSetup')).name;
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    leaderboard.push({ name: userName, score: percentage });
    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    setShowResult(true);
  };

  const handleConfirmation = (confirmation) => {
    if (confirmation === 'yes') handleFinishQuiz();
    setShowConfirmationPopup(false);
  };

  if (!questions.length) return <div className="loading">Loading...</div>;

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <h2>
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="question">{questions[currentQuestionIndex].question}</div>
          <div className="options">
            {questions[currentQuestionIndex].incorrect_answers
              .concat(questions[currentQuestionIndex].correct_answer)
              .map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`option-button ${feedbackClass(option)}`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
          </div>
          <div className="buttons">
            {currentQuestionIndex > 0 && <button onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>Previous</button>}
            <button onClick={handleNextQuestion}>
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <div className="result-container">
          <h3>Quiz Completed!</h3>
          <p>Your score: {score}%</p>
          <p>Correct Answers: {correctAnswers}</p>
          <p>Incorrect Answers: {incorrectAnswers}</p>
          <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
        </div>
      )}

      {showConfirmationPopup && (
        <div className="confirmation-popup">
          <p>Are you sure you want to finish the quiz?</p>
          <button onClick={() => handleConfirmation('yes')}>Yes</button>
          <button onClick={() => handleConfirmation('no')}>No</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;