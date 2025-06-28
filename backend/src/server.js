import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


try {
  await mongoose.connect("mongodb+srv://kapilsaini0125:SK0imtnncsqV6Qdr@cluster0.9uirnqe.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0");
  console.log('Connected to MongoDB');
} catch (err) {
  console.error('MongoDB connection error:', err);
}


const Todo = mongoose.model('Todo', {
  text: String,
  completed: Boolean,
  userName: String
});

const Account = mongoose.model('Account', {
  userName: String
}) 


app.post('/api/todos/account/login', async (req, res) => {
  console.log("on login")
  const formData= req.body.name;
  console.log(formData)
  
  if(!formData ){
    res.json({success: false, error: "Details require"})
  }

  try{
  const logInUser= await Account.findOne(
    {userName: formData}
  );
  console.log(logInUser)
  if(!logInUser){
    res.json({success: false, error: "Invalid details"} );
    console.log("user not match");
  }

res.json({id: logInUser._id});
console.log("sending id to frontend"); 

} catch(error){
        res.json({success: false, error: "Server Error"});
}
});

app.post('/api/todos/account/signup', async (req, res) => {
   console.log("on signup endpoint");
  //req.body now able to parasing the sended formData 
  //by app.use(express.json()) -> it allows to handel object-format-data between frontend-backend
  //for transferring simple string we have to use app.use(express.text()) 
  
  const formData = req.body.username// here it storing only string from frontend (res.body.username)
  //const formData = req.body -> here it is storing an object fromate from the res.body

 try {
   const signUpUser= new Account({
    userName: formData
   })
   console.log(signUpUser)
   await signUpUser.save();
  res.json({id: signUpUser._id,
    userName: signUpUser.userName
  });
   console.log("user_id sending to frontend")
  } catch (error) {
    console.log(error);
  }
});


app.get('/api/todos', async (req, res) => {
  try {
    console.log("fetching user_id todo")
    
    
    const todos = await Todo.find(
      {userName:  req.query.id}, 
     
    );
    console.log(todos);
    res.json(todos);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/todos/completed', async (req, res) => {
  try {
    const allTodo = await Todo.find();
    const completedTodo =allTodo.filter({completed: true});
    res.json(completedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/todos/searchToDo', async (req, res) => {
  try {
    const searchText = req.query.q;
    if (!searchText) {
      return res.status(400).json({ error: 'Query parameter required' });
    }
    
    const todos = await Todo.find({
      text: { $regex: searchText, $options: 'i' }
    });
    
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/todos', async (req, res) => {
  const { userText, username } = req.body;
  
  if (!username) {
    return res.status(400).json({ error: 'User not authenticated' });
  }

  try {
    const todo = new Todo({
      text: userText,
      completed: false,
      userName: username 
    });
    
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    
    const {updateText} = req.body;
    
    const todo = await Todo.filter(
      todos => todos._id === req.params.id 
    )
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

   todo.Text= {updateText};
   res.json(todo);
   
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.text !== undefined) updates.text = req.body.text;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});