import React, { useState, useEffect } from "react";

type Question = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
};

const questions: Question[] = [
  {
    id: 1,
    questionText: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    questionText: "What is the capital of Germany?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Berlin",
  },
  {
    id: 3,
    questionText: "What is the capital of Spain?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Madrid",
  },
  // ... add other questions here
];

const Question: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Reset timer when a new question is loaded
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleAnswerSubmit = () => {
    if (selectedAnswer) {
      // Mark the question as completed
      setCompletedQuestions([...completedQuestions, currentQuestionIndex]);

      // Move to the next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null); // Reset selected answer
        setTimeLeft(60); // Reset the timer
      } else {
        console.log("Quiz completed");
      }
    }
  };

  const handleSubmitQuiz = () => {
    console.log("Quiz Submitted");
    // Handle quiz submission (e.g., calculate score, show results, etc.)
  };

  return (
    <div style={styles.container}>
      <div style={styles.questionSection}>
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{questions[currentQuestionIndex].questionText}</p>
        <ul style={styles.optionsList}>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <li key={index} style={styles.optionItem}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <p>Time left: {timeLeft} seconds</p>

        {/* Conditionally render Next or Submit button */}
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleAnswerSubmit} style={styles.submitButton}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmitQuiz} style={styles.submitButton}>
            Submit
          </button>
        )}
      </div>
      <div style={styles.sidebar}>
        <h3>Questions</h3>
        <ul style={styles.questionList}>
          {questions.map((_, index) => (
            <li key={index} style={styles.questionNumber}>
              {index + 1}{" "}
              {completedQuestions.includes(index) && (
                <span style={styles.completedTick}>✔</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "20px",
  },
  questionSection: {
    width: "60%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  optionsList: {
    listStyleType: "none",
    padding: 0,
  },
  optionItem: {
    marginBottom: "10px",
  },
  submitButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  sidebar: {
    marginLeft: "20px",
    width: "20%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f1f1f1",
  },
  questionList: {
    listStyleType: "none",
    padding: 0,
  },
  questionNumber: {
    marginBottom: "10px",
    fontSize: "18px",
  },
  completedTick: {
    color: "green",
    fontWeight: "bold",
    marginLeft: "5px",
  },
};

export default Question;
