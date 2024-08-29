import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timeoutId = setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);

      // Cleanup function to clear timeout
      return () => clearTimeout(timeoutId);
    } else {
      // When time runs out, reset the timer and call onAnswered with false
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer for the next question
    onAnswered(isCorrect); // Pass the result to the parent component
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

