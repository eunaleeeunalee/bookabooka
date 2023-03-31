import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
`

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [newName, setNewname]= useState("");

  //initializing happens only the beginning
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=> {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
        setUserObj(null); //trigger the logout
      }
      setInit(true);
    })
  },[])
  

  const refreshUser = ()=> {
    const user = authService.currentUser;
    setNewname(user.displayName);
  }
  
  return (
    <Wrapper>
          {init? 
            <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}/> :
          "Initializing..."}
    </Wrapper>
  );
}

export default App;
