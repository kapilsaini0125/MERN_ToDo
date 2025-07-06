import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router' ;
import SignupPage from './components/signupPage';
import TodoPage from './components/todoPage';
import LoginPage from './components/loginPage';
import './App.css'


function App() {

    const [currentUser, setCurrentUser]= useState(() => { 
    const currentUserState= localStorage.getItem('currentUser')
    console.log("local storage", currentUserState)
    return currentUserState? JSON.parse(currentUserState): null
  });
  
  useEffect(() => {
  if(currentUser == null){
    console.log("currentUser is null")
  }
  if (currentUser ){
   console.log("currnet user find")
   console.log(currentUser)
  }
  }, [currentUser]);

   return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={currentUser ? <Navigate to="/todo" /> : <Navigate to="/signup" />} />
         <Route path="/signup" element={<SignupPage setCurrentUser={setCurrentUser} />} />
         <Route path="/todo" element={<TodoPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      </Routes>
    </BrowserRouter>
  );
  

  
}

export default App