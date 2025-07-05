

const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

const handleSignUp = async (e) => {
        e.preventDefault();
       try {
        
       const signUp= await axios.post('http://localhost:5000/api/todos/account/signup', 
        formData
        );
        const new_id= signUp.data.id;
        //not 
         //console.log(new_id);
         
        
        setCurrentUser(new_id);
        
        } catch (error) {
        console.log(error);
       }
  

 return (
      <div className="container mx-auto p-4 max-w-md">
       
        <div className="container mx-auto p-4 max-w-md">
        <Toaster position="top-right" />
        <h1 className="text-2xl font-bold mb-4">Signup page</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
              
            </div>
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
              Sign Up
            </button>
            
            
          </form>
           <button
            onClick= {() => 
             { 
              // login component
            }}
            >Have An Account</button>
        </div>
       
      </div>
    );
}

export default Signup
