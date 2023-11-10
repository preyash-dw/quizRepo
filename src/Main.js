import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SideBar/SideBar";
import Rightbar from "./components/Rightbar/Rightbar";
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Main = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [totalmarks, setTotal] = useState(0);
  const [markedQuestions, setMarkedQuestions] = useState({});
  const [questiondata, setQuestions] = useState([]);
const [reviewedQuestions, setReviewedQuestions] = useState({});
const navigate=useNavigate();


const fetchQuestions = async () => {
  try {
    const response = await fetch('http://localhost:4000/random-questions');
    const data = await response.json();

    const questionsWithIds = data.map((question, index) => ({
      ...question,
      id: index + 1,
    }));

    setQuestions(questionsWithIds);
    setSelectedQuestion(questionsWithIds[0]); 
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};


useEffect(() => {
  fetchQuestions();
}, []);

const handleMarkedQuestion = (questionId, selectedOptionId, isMarkedForReview) => {
  const updatedMarkedQuestions = {
    ...markedQuestions,
    [questionId]: selectedOptionId,
  };

  if (isMarkedForReview) {
    setReviewedQuestions({
      ...reviewedQuestions,
      [questionId]: selectedOptionId,
    });
  }

  setMarkedQuestions(updatedMarkedQuestions);
};


  const handletotal = (marks) => {
    setTotal(totalmarks + marks);
  };

  const handleNextQuestion = (
    currentQuestionId,
    selectedOptionId,
    correctOptionId
  ) => {
    console.log(selectedOptionId);
    console.log(correctOptionId);
    if ((selectedOptionId+1) === correctOptionId) {
      handletotal(3);
    } else {
      handletotal(-1);
    }

    const currentIndex = questiondata.findIndex(
      (question) => question.id === currentQuestionId
    );
    const nextQuestion = questiondata[currentIndex + 1];

    setSelectedQuestion(nextQuestion);
  };

  const onSubmit = () => {
    props.total(totalmarks);
    navigate("/thanks");
  };

  const handleQuestionSelection = (question) => {
    setSelectedQuestion(question);
  };


  
  
  return (
    <div>
      <Navbar/>

      <Sidebar
        onQuestionSelect={handleQuestionSelection}
        markedQuestions={markedQuestions}
        questiondata={questiondata}
      />
      <Rightbar
        question={selectedQuestion}
        total={handletotal}
        onNextQuestion={handleNextQuestion}
        onSubmit={onSubmit}
        onMarked={handleMarkedQuestion}
        markedQuestions={markedQuestions}
      />
    </div>
  );
};

export default Main;
