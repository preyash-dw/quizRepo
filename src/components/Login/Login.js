import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className='login'>
      <div className='container'>
        <form action=''>
          <h2>Login</h2>
          <hr />
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Enter your email' />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' placeholder='Enter your password' />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

