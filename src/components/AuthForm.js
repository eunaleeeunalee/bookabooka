import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword
    } from 'firebase/auth';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InWrapper = styled.div`
    input[type=email], [type=password]{
        width: 80%;
        margin-bottom: 1vh;
    }
    input[type=submit]{
        font-size: 1.3vw;
    }
    @media only screen and (max-width: 768px){
        input[type=submit], button{
            font-size: 16px;
        }
    }
`
const Title = styled.h6`
    margin-bottom: 5vh;
    span{
        cursor: pointer;
    }
`

const Selected = styled.span`
    font-weight: 900;
    text-decoration: underline;
`


const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPw] = useState("");
    const [newAccount, setNewA] = useState(true);
    const [error, setError] = useState("");


    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPw(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
        let data;
        const auth = getAuth();
        if(newAccount){
            data = await createUserWithEmailAndPassword(auth, email, password);
        }else{
            data = await signInWithEmailAndPassword(auth, email, password);
        }
        console.log(data.UserCredentialImpl.user.uid)
        }catch(error){
            setError(error.message)
        }
    }

 

    //로그인 할꺼냐 계정 만들꺼냐
    const toggleAccount = ()=> {
        setNewA(prev=> !prev);
    }

    return(
        <InWrapper> 
            <Title>
                {newAccount? <span onClick={toggleAccount}>Sign in</span>:<Selected>Sign in</Selected>} / 
                {newAccount? <Selected>Sign up</Selected>: <span onClick={toggleAccount}>Sign up</span>}
                {/* <Selected>
                    {newAccount? "Sign in": "Sign up"}
                </Selected> / <span onClick={toggleAccount}>{newAccount? "Sign up": "Sign in"}</span> */}
            </Title>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} required/>
                <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required/>
                <br/><br/>
                <input type="submit" value={newAccount? "Create Account" :"Log In"} />
                {error}
            </form>
           
        </InWrapper>
    )
}

export default AuthForm