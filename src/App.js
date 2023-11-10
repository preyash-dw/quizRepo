import { useState } from 'react';
import './App.css';
import Main from "./Main";
import Register from "./components/Register/Register"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Thanks from './components/Thanks/Thanks';
import { UserProvider } from './UserContext';


const App = () => {
  const [register, setregister]=useState("");
  const [marks,setMarks]=useState(0);

  const onsubmit=(email)=>{
    setregister(email);
  }

  const total=(marks)=>{
    setMarks(marks);
  }

  return (
    <Router>
      <UserProvider>
    <Routes>
      <Route path="/" element={<Register handle={onsubmit}/>} />
      {register && (
          <Route path="/main" element={<Main email={register} total={total}/>} />
          
        )}
      <Route path="/thanks" element={<Thanks total={marks}/>} />
    </Routes>
    </UserProvider>
  </Router>

  );
};

export default App;
