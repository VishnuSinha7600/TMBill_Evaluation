// src/Welcome.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import welcom from './assest/image.png'

// TMBill-Evaluation/frontend/src/pages/LoginRegisterPage.css
const Welcome = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // const fetchTasks = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5000/api/tasks');

  //     setTasks(res.data);
  //   } catch (error) {
  //     console.error(error)
  //   }

  // };
  // console.log(user)

    const fetchTasks = async () => {
      try {

        const res = await axios.get(`http://localhost:5000/api/tasks?userId=${user._id}`);
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    // useEffect(() => {
    //   const storedUser = localStorage.getItem('user');
    //   if (storedUser) {
    //     setUser(JSON.parse(storedUser));
    //   } else {
    //     navigate('/');
    //   }
    // }, []);

    useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);

    // Normalize _id for consistency
    const normalizedUser = {
      ...parsedUser,
      _id: parsedUser._id || parsedUser.id,
    };

    setUser(normalizedUser);
  } else {
    navigate('/');
  }
}, []);


    useEffect(() => {
      if (user) {
        fetchTasks(); // Only run when user is available
      }
    }, [user]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const {userId ,title, description} = form;
  //     const task = {userId ,title , description , completed:true}
      
  //     if (editingId) {
  //       await axios.put(`http://localhost:5000/api/tasks/${editingId}`, task);
  //       setEditingId(null);
  //     } else {
  //       await axios.post('http://localhost:5000/api/tasks/create', task);
  //     }
  //     setForm({  userId:'', title: '', description: ''});
  //     fetchTasks();


  //   } catch (err) {
  //     alert(err.message)
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const task = {
      title: form.title,
      description: form.description,
      userId: user._id, // Add this
      completed: true,
    };

    if (editingId) {
      await axios.put(`http://localhost:5000/api/tasks/${editingId}`, task);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/tasks/create', task);
    }

    setForm({ title: '', description: '' });
    fetchTasks();
  } catch (err) {
    alert(err.message);
  }
};


  const handleEdit = (task) => {
    const {title, description} = task;
     setForm({ title, description, });
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen flex flex-col">
       
      {/* Sticky NavBar */}
      <nav className="sticky top-0 bg-transparent  shadow-md z-10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-base font-bold text-red-600 border border-x-red-800 px-3"> {user?.username}</h1>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => {
            localStorage.removeItem('user'); // remove user
            navigate('/'); // go back to login
          }}
        > 
          Logout
        </button>
      </nav>

      {/* Welcome Section */}
     <div className="w-full h-screen bg-gradient-to-r from-blue-500 to-blue-100 flex flex-col md:flex-row items-center justify-center p-12 mx" >

{/* Left - Welcome Text  */}

  <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
    <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
      Welcome , <br /><span className=" text-8xl bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
  {user?.username}
</span>
    </h2>
    <p className="text-lg text-gray-700">
      We help your business to grow
    </p>
  </div>

  {/* Right - Image */}
  <div className="w-full md:w-1/2 flex justify-center">
    <img
      src={welcom} // Replace with your image URL
      alt="Dashboard Illustration"
      className="max-w-full h-auto rounded "
    />
  </div>


</div>

   <div className="min-h-screen px-4 py-8 bg-gradient-to-r from-blue-500 to-blue-100">
  <h2 className="text-3xl font-bold text-center mb-6">To-Do List</h2>

  {/* Form Section */}
  <form
    onSubmit={handleSubmit}
    className="max-w-xl mx-auto bg-transparent shadow-2xl p-6 rounded-2xl space-y-6"
  >
    <input
      type="text"
      name="title"
      value={form.title}
      onChange={handleChange}
      placeholder="Title"
      required
      className="w-full p-3 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white placeholder:text-xl"
    />
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Description"
      required
      className="w-full p-3 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white"
    />
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      {editingId ? 'Update' : 'Add'} Task
    </button>
  </form>

  {/* Tasks Section */}
  <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
    {tasks.map((task) => (
      <div
        key={task._id}
        className="bg-blue-400 overflow-hidden border rounded-md shadow-2xl p-4 flex flex-col sm:flex-row sm:justify-between "
      >
        <div className="mb-2 sm:mb-0 max-w overflow-hidden ">
          <p className="font-semibold text-lg text-blue-700">{task.title}</p>
          <p className="text-gray-700">{task.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => handleEdit(task)}
            className="text-green-900 hover:underline border border-spacing-2 p-1"
          >
            Edit
          </button>
          
          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-600 hover:underline border border-spacing-2 p-1"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
    
  );
};

export default Welcome;



