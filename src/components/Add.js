import React, { useState } from 'react';

function Add() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      question,
      options,
      correctOptionIndex,
    };

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Question added:', data);
        setQuestion("");
      })
      .catch((error) => {
        console.error('Error adding question:', error);
        
      });
  };

  return (
    <div>
      <h1>Add a Question</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <br />

        {options.map((option, index) => (
          <div key={index}>
            <label htmlFor={`option${index + 1}`}>{`Option ${index + 1}:`}</label>
            <input
              type="text"
              id={`option${index + 1}`}
              name="options"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
            <br />
          </div>
        ))}

        <label htmlFor="correctOptionIndex">Correct Option Index (1-4):</label>
        <input
          type="number"
          id="correctOptionIndex"
          name="correctOptionIndex"
          value={correctOptionIndex}
          onChange={(e) => setCorrectOptionIndex(parseInt(e.target.value))}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Add;
