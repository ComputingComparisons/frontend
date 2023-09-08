import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Signin from "./components/Signin"
import { AuthProvider } from "./AuthProvider";
import Signup from './components/Signup';
import Create from './components/Create';
import { useContext } from 'react';
import ResetPassword from './components/ResetPassword';
import Redirect from './components/home/Redirect';
import AuthContext from './AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import Classroom from './components/classrooms/Classroom';
import AdminClassroom from './components/classrooms/AdminClassroom';
import AdminClassroomList from './components/classrooms/AdminClasroomList';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        <Route path="login" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset" element={<ResetPassword />} />
        <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path="/create/:analogId" element={<ProtectedRoute><Redirect /></ProtectedRoute>} />
        <Route path="/create/:analogId/:indId" element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path="/classrooms" element={<ProtectedRoute><AdminClassroomList /></ProtectedRoute>} />
        <Route path="/adminclassrooms/:classroomId" element={<ProtectedRoute><AdminClassroom /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
