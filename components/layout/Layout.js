import React, { createContext, useReducer } from 'react';
import Navbar from "./Navbar"
import Toolbar from "./Toolbar"




function Layout({ children }) {
 
  return <div className="layoutContainer">
    <Navbar />
      <Toolbar />
      {children}
   
   </div>;
}

export default Layout;
