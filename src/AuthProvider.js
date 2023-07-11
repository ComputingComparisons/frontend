import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import AuthContext from './AuthContext'
const auth = getAuth()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      return onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
      });
  }, []);

  return (
      <AuthContext.Provider value={{ user, loading }}>
          {children}
      </AuthContext.Provider>
  );
};