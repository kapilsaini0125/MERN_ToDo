
import './App.css';
function LoginPage({setCurrentUser}){

const [formData, setFormData] = useState({
    password: ''
  });

const handleLogIn = async (e) => {
    
    e.preventDefault(); //  to prevent page reload
       
       
      try{
        toast.success('login call ')
        
        const findUser = await axios.post('http://localhost:5000/api/todos/account/login', {checkUserPassword: formData.password})
        console.log("comeIn")
         setCurrentUser(findUser.data.id);

       
        }catch(error){
          toast.error(error)
    }
    

  return (
      <div className="container mx-auto p-4 max-w-md">
       
        <div className="container mx-auto p-4 max-w-md">
        <Toaster position="top-right" />
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
}

export default LoginPage
