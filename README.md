# TMBill Evaluation – Full Stack To-Do List App with User Auth

This is a full-stack web application built as part of the TMBill Evaluation assignment. 
It features a user login system, registration, and a personalized To-Do list where users can create, read, update, and delete tasks. 
Each task stores a title, description, completion status, and is tied to the logged-in user.

## 🌐 Live Demo

- **Frontend (React + Tailwind CSS):** [Live on Netlify](https://glistening-kitsune-9ae470.netlify.app/) 
- **Backend (Express.js + MongoDB):** [Live on Render](https://github.com/VishnuSinha7600/TMBill_Evaluation)


🚀 Getting Started (Local Setup)

 Prerequisites
- Node.js, npm
- MongoDB URI



✨Backend

bash

cd backend

npm install

npm start


✨Frontend

cd frontend

npm install

npm start




🗂️ Project Structure

TMBill-Evaluation/

│

├── backend/ # Express.js server

│ ├── models/ # Mongoose schemas (User, Task)

│ ├── routes/ # Auth and Task routes

│ └── index.js # Server entry point

│

├── frontend/ # React application

│ ├── public/ # Static files and _redirects

│ ├── src/ # Pages, components, and API logic

│ └── package.json # Frontend scripts and dependencie


🔐 Features

✅ Authentication
- User Registration and Login
- Password hashing with bcrypt
- JWT-based session storage

✅ Task Management
- Add, edit, delete,
- Tasks tied to individual users
- Each task includes: title, description, completed status

 ✅ UI & UX
- Responsive layout using **Tailwind CSS**
- SPA routing with **React Router**
- Clear login/register transitions and state-based rendering

  

💻 Tech Stack

| Frontend              | Backend               | Database         |
|-----------------------|------------------------|------------------|
| React.js              | Node.js + Express.js   | MongoDB (Atlas)  |
| Tailwind CSS          | JWT Auth               | Mongoose ODM     |
| React Router DOM      | bcrypt for hashing     |                  |
| Netlify Deployment    | CORS-enabled API       |                  |



