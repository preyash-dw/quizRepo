import React, { useState, useEffect } from "react";
import "./RightBar.css";
import { useNavigate } from 'react-router-dom';

const Rightbar = ({ question, onSubmit, onNextQuestion, onMarked }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(900);
  const [submit, setSubmit] = useState(true);
  const [warnings, setWarnings] = useState(0);
  const navigate = useNavigate();

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNextClick = () => {
    if (selectedOption !== null) {
      onNextQuestion(question.id, selectedOption, question.correctOptionIndex);
      onMarked(question.id, selectedOption);
      setSelectedOption(null);
    }
  };
  const handleTimerSubmit = () => {
    if(timer===0){
      navigate("/thanks");
    }
    else {
    setSubmit(false);
    }
    
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleTimerSubmit();
    }
  }, [timer]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setWarnings((prevWarnings) => prevWarnings + 1);

        if (warnings === 0) {
          alert("1st Warning: Switching tabs may affect your test progress.");
        } else if (warnings === 1) {
          alert("2nd Warning: Switching tabs again will auto-submit the test.");
        } else if (warnings === 2) {
          alert("3rd Warning: Test will be auto-submitted. Thank you!");
          navigate("/thanks"); 
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [warnings, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
  <div className="rightbar">
    <div className="time">
    <p>Time remains:</p>
      <h3>{formatTime(timer)}</h3>
      
    </div>
    {!submit? (<div className="confirm">
      <h3>Are you sure you want to submit ?</h3>
      <div className="yes">
        <button onClick={()=>onSubmit()}>Yes</button>
        <button onClick={()=>setSubmit(true)}>No</button>
      </div>
    </div>):(
    <div className="rightcontainer">
      <p className="quest">
        {question ? question.question : "Select a question from the sidebar."}
      </p>
      {question && (
        <div className="option">
          {question &&
            question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={selectedOption === index ? "active" : ""}
              >
                <p className="round">{index + 1}</p>
                <p className="content">{option}</p>
              </button>
            ))}
        </div>
      )}
      <div className="marking">
        <div className="leftmark">
          <button>Mark For Review</button>
        </div>
        <div className="rightmark">
          <button onClick={handleNextClick}>Next</button>
        </div>
      </div>
      <div className="submit">
        <button onClick={handleTimerSubmit}>Submit</button>
      </div>
    </div>)}
  </div>
  );
};

export default Rightbar;
