
import React, { useState } from 'react'; 
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function LoginPage({setCurrentUser}){
const navigate= useNavigate();

const [formData, setFormData] = useState({
    password: ''
  });

const handleLogIn = async (e) => {
    
    e.preventDefault(); //  to prevent page reload
       
       
      try{
       
        const findUser = await axios.post('http://localhost:5000/api/todos/account/login', {checkUserPassword: formData.password})
        console.log(findUser.data.id)
        localStorage.setItem('currentUser',JSON.stringify(findUser.data.id))
        setCurrentUser(findUser.data.id);
        if(findUser.data.id!= null)
          {
            navigate('/todo')
          }
        else{
          navigate('/signup');
        }
       
        }catch(error){
          console.error(error)
    }
  }

  return (
      <div className="container mx-auto p-4 max-w-md">
       
        <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login page</h1>
        <form onSubmit={handleLogIn} className="space-y-4">
            
            <div>
              <label className="block mb-1">Password:</label>
              <input
                type="text"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
              
            </div>
            
            <button
              
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
              
            >
              LogIn...
            </button>
          </form>
        </div>
      </div>
    );

}

export default LoginPage
