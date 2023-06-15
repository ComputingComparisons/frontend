import { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { signOutApp } from "../firebase_setup/firebase";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOutApp();
  };

  if (!user) {
    console.log(user);
    navigate("/login");
    return null;
  }
  return (
    <>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
