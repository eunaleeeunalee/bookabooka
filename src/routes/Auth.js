import React, { useState } from "react";
import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    } from 'firebase/auth';
import {authService} from "../fbase"    
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
    faGithub,
  } from "@fortawesome/free-brands-svg-icons";
  import styled from "styled-components";


const Innerbox = styled.div`
  position: fixed;
  top: 26vh;
  width: 36vw;
  height: 48vh;
  border-radius: 20vw;
  box-shadow: 0 0 5em 6em white;
  background: white;
  text-align: center;
  display: flex;
  justify-content: center; 
  align-items: center;
  h5{
      margin-bottom: 3vh;
  }

  @media only screen and (max-width: 768px){
      top: 20vh;
      height: 60vh;
      width: 60vw;
      border-radius: 20vw;
      box-shadow: 0 0 9vw 10vw white;
      h5{
          font-size: 24px;
          line-height: 30px;
      }
  }
`

const Box3 = styled.div`
  margin-top: 4.5vh;
  
`

const Footer = styled.footer`
margin-top: 4.5vh;
  text-align: center;
`



const Auth = () => {
    const onSocialClick = async (event) => {
        //ES6 배우면 이해
        const {target: {name}} = event;
        let provider;
        if(name === "google"){
            provider = new GoogleAuthProvider();
            //로그인창이 팝업으로
        }else if(name === "github"){
            provider = new GithubAuthProvider();
        }
        // await signInWithPopup(authService, provider);
        await signInWithPopup(authService, provider);
    }

    return(
      <Innerbox>
        <div>
          <h5>🔮Booka booka🔮</h5>
          <AuthForm/>
          <Box3>
              
              <button onClick={onSocialClick} name="google"><FontAwesomeIcon icon={faGoogle} /></button>
              
              <button onClick={onSocialClick} name="github"><FontAwesomeIcon icon={faGithub} /></button>
          </Box3>
          <Footer>&copy; {new Date().getFullYear()} eunaleeeunalee</Footer>
        </div>
      </Innerbox>)
};

export default Auth;