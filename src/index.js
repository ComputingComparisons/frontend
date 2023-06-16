import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Signin from "./components/Signin"
import Profile from './components/Profile';
import { AuthProvider } from "./AuthProvider";
import Signup from './components/Signup';
import Create from './components/Create';
import { useContext } from 'react';
import ResetPassword from './components/ResetPassword';
import Redirect from './components/home/Redirect';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Signin />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset" element={<ResetPassword />} />
        <Route path="create" element={<Create />} />
        <Route path="/create/:analogId" element={<Redirect />} />
        <Route path="/create/:analogId/:indId" element={<Create />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
