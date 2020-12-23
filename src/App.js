import React, { useState } from "react";
import { questions } from "./components/questions/movies/breaking_bad";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleAnswerOptionClick(answerOption, index) {
    setSelectedOptionIndex(index);
    setClicked(true);

    if (answerOption.isCorrect) {
      setScore(score + 1);
    }

    await sleep(500);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
    setClicked(false);
    setSelectedOptionIndex(null);
  }
  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <br /> 
          Your scored is <br />
          <b>{score} out of {questions.length}</b>
          <br /> 
          <br /> 
          <a href="/">Play Again</a> 
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <button
                  key={index}
                  onClick={() =>
                    clicked
                      ? null
                      : handleAnswerOptionClick(answerOption, index)
                  }
                  className={
                    clicked && selectedOptionIndex === index
                      ? answerOption.isCorrect
                        ? "correct"
                        : "incorrect"
                      : clicked && answerOption.isCorrect
                      ? "correct"
                      : "no-box-shadow"
                  }
                >
                  {answerOption.answerText}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
