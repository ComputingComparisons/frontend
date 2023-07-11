import { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { signOutApp } from "../firebase_setup/firebase";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (await signOutApp()) {
      navigate("/login");
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
