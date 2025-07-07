import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router' ;
import SignupPage from './components/signupPage';
import TodoPage from './components/todoPage';
import LoginPage from './components/loginPage';
import './App.css'


function App() {

    const [currentUser, setCurrentUser]= useState(() => { 
    const currentUserState = localStorage.getItem('currentUser')
    return currentUserState != null ? JSON.parse(currentUserState) : null
  });
    const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      console.log("currentUser", currentUser);
     
    if(currentUser){
       setIsLoading(false);
      }else{
      setIsLoading(false);
    }
  }, [currentUser]);

  if(isLoading){
    return (
    <div className="loading">
      <h1>
        Loading...
      </h1>

  </div>
  )
  }
   
    return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={currentUser ? <Navigate to="/todo" /> : <Navigate to="/signup" />} />
         <Route path="/signup" element={<SignupPage setCurrentUser={setCurrentUser} />} />
         <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
         <Route path="/todo" element={<TodoPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      </Routes>
    </BrowserRouter>
  );
   
}

export default App