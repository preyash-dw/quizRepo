import React, { useState } from 'react';

import './Sidebar.css'; 

const Sidebar = ({ onQuestionSelect ,markedQuestions,questiondata}) => {
  const [section1Visible, setSection1Visible] = useState(false);
  const [section2Visible, setSection2Visible] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  console.log(questiondata);
  const section1Questions= questiondata.slice(0, 15);
  const section2Questions= questiondata.slice(15);

  const totalSection1Questions = section1Questions.length;
  const totalSection2Questions = section2Questions.length;

  const markedSection1Questions = section1Questions.filter(
    (question) => markedQuestions[question.id]
  );
  const markedSection2Questions = section2Questions.filter(
    (question) => markedQuestions[question.id]
  );

  const toggleSection = (section) => {
    if (section === 'section1') {
      setSection1Visible(!section1Visible);
      setSection2Visible(false); 
    } else if (section === 'section2') {
      setSection2Visible(!section2Visible);
      setSection1Visible(false); 
    }
    setSelectedSection(section); 
  };



  const handleMarkedQuestionClick = (question) => {
    if (markedQuestions[question.id]) {
      alert("This question has been marked.");
    } else {
      onQuestionSelect(question);
    }
  };
  return (
    <div className="sidebar">
      <div
        className={`section ${selectedSection === 'section1' ? 'selected' : ''}`}
        onClick={() => toggleSection('section1')}
      >
        <span>Section 1</span>
        <span> <p>
            {markedSection1Questions.length}/{totalSection1Questions} completed
          </p></span>
      </div>
      {section1Visible && (
        <div className="sub-divs">
           {section1Questions.map((question) => (
             <div
             key={question.id}
             className={`sub-div ${markedQuestions[question.id] ? 'marked' : ''}`}
             onClick={() => handleMarkedQuestionClick(question)}
           >
             Question {question.id}
           </div>
          ))}
        </div>
      )}
      <div
        className={`section ${selectedSection === 'section2' ? 'selected' : ''}`}
        onClick={() => toggleSection('section2')}
      >
        <span>Section 2</span>
        <span>  <p>
            {markedSection2Questions.length}/{totalSection2Questions} completed
          </p></span>
      </div>
      {section2Visible && (
        <div className="sub-divs">
          {section2Questions.map((question) => (
            <div key={question.id} className="sub-div"  onClick={() => handleMarkedQuestionClick(question)}>
              Question {question.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
