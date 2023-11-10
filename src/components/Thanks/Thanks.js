import React, { useEffect } from 'react';
import { useUser } from '../../UserContext';
import "./Thanks.css"
const Thanks = (props) => {
  const { userData } = useUser();

  // useEffect(() => {
  //   const sendEmail = async () => {
  //     try {
  //       const response = await fetch('http://localhost:4000/api/send-email', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           to: userData.email,
  //           subject: 'Quiz Result',
  //           text: `Thank you for participating in the quiz. Your result: ${
  //             props.total > 40 ? 'Pass' : 'Fail'
  //           }, Total Marks: ${props.total}`,
  //         }),
  //       });

  //       if (response.ok) {
  //         const responseData = await response.json();
  //         console.log('Email sent:', responseData);
  //       } else {
  //         console.error('Error sending email:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error sending email:', error);
  //     }
  //   };

  //   sendEmail();
  // }, [props.total, userData.email]);

  return (
    <div className='thanks'>
      {userData.image && <img src={userData.image} alt="User" />}
      <h1>Thank You For Participating in the quiz</h1>
      <p>{props.total > 40 ? 'Hurrah! You passed the quiz' : 'Unfortunately, you failed the quiz'}</p>
      <p>We will forward your marks to your email {userData.email}.</p>
    </div>
  );
};

export default Thanks;
