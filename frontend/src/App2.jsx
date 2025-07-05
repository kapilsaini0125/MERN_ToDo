

import SignUpPage from './components/signupPage'
import LoginPage from './components/loginPage'
import TodoPage from './components/todoPage'

import './App.css'


function App() {

    const [currentUser, setCurrentUser]= useState(() => { 
    const currentUserState= localStorage.getItem('currentUser')
    return currentUserState != null? JSON.parse(currentUserState): null
  });
  
  useEffect(() => {
  
  if (currentUser != null){
   localStorage.setItem('currentUser', JSON.stringify(currentUser))
  console.log(currentUser)

  }
  }, [currentUser]);

  return(
    <BrowsweRouter>
    <Routes>
      <Route path="/" element= {}/>
      <Route path="/signup" element= {<login />}/>
      <Route/>
    </Routes>
    </BrowsweRouter>
  )
  

  
}

export default App