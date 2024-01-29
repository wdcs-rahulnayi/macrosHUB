import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
    if(typeof window !== undefined){
      localStorage.setItem('user', JSON.stringify(userData))
    }
  };

  const logoutUser = () => {
    setUser(null);
    if(typeof window !== undefined) {
      localStorage.removeItem('user');
    }
  };  

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')) || null)
  },[])

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
