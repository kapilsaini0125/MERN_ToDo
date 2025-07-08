import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router' ;
import SignupPage from './components/signupPage';
import TodoPage from './components/todoPage';
import LoginPage from './components/loginPage';
import axios from 'axios';
import './App.css'


function App() {

  const fetchTodos = async () => {
    try {
     
      const response = await axios.get('http://localhost:5000/api/todos',{
       params : {logInUser: currentUser}
      })
      setTodos(response.data)
    } catch (error) {
      console.error('Failed to fetch todos')
    }
  }

    const [currentUser, setCurrentUser]= useState(() => { 
    const currentUserState = localStorage.getItem('currentUser')
    return currentUserState != null ? JSON.parse(currentUserState) : null
  });
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      console.log("currentUser", currentUser);
     
    if(currentUser){
       setIsLoading(false);
       fetchTodos();
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
         <Route path="/todo" element={<TodoPage currentUser={currentUser} setCurrentUser={setCurrentUser} todos= {todos} setTodos= {setTodos} />} />
      </Routes>
    </BrowserRouter>
  );
   
}

export default App