import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import "./Register.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import image from "../../image/quizlogo.jpg";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';

const Register = ({ handle }) => {
  const [showWrite, setShowWrite] = useState(false);
  const [showInstruct, setShowInstruct] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleGetStart = () => {
    setShowWrite(true);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('Captured Image:', imageSrc);
  };

  const handleSubmit = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email.trim() !== '' && emailRegex.test(email)) {
      setShowInstruct(true);
      setValidEmail(true);
      handle(email);
      capture();
      updateUser(email, webcamRef.current.getScreenshot());
      setTimeout(() => {
        navigate('/main');
      }, 2000);
       // Call the capture function when submitting
    } else {
      setValidEmail(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className='register'>
      <div className="container">
        <div className="logo">
          <img src={image} alt="" />
        </div>
        <div className="start">
          <button onClick={handleGetStart}>Get Start <span><AiOutlineArrowRight /></span></button>

          <div className={`write ${showWrite ? 'visible' : ''}`}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{ maxWidth: '50%', maxHeight: '100px', display: 'block', margin: 'auto' }}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {!validEmail && <p className="error">Invalid email format</p>}

          <div className={`instruct ${showInstruct ? 'visible' : ''}`}>
            <h4>Instructions</h4>
            <ul>
              <li>There are 50 questions divided into 2 sections.</li>
              <li>15 mins are available for you to complete the test.</li>
              <li>+3 for the correct answer and -1 for the incorrect answer.</li>
              <li>You need to select any option and then click on next to move.</li>
              <li>Click on submit to finish the test.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
