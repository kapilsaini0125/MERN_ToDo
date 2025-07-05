import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom' ;
import SignupPage from './components/signupPage';
import TodoPage from './components/todoPage';
import './App.css'


function App() {

    const [currentUser, setCurrentUser]= useState(() => { 
    const currentUserState= localStorage.getItem('currentUser')
    return currentUserState != null? JSON.parse(currentUserState): null
  });
  
  useEffect(() => {
  
  if(currentUser == null){
    console.log("currentUser is null")
  }
   
  if (currentUser != null){
   console.log("currnet user find")
   console.log(currentUser)
   
  }
 
  
  }, [currentUser]);

   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {currentUser? <Navigate to="/todo" />: <Navigate to="/signup" />}/>
        <Route path="/signup" element={<SignupPage currentUser = {currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/todo" element={
          <TodoPage currentUser={currentUser} setCurrentUser={setCurrentUser} /> 
            
        }/>
      </Routes>
    </BrowserRouter>
  );
  

  
}

export default App