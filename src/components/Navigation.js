import React, { useState } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome, faUser, faXmark, faPen, faBars
  } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
  

const Resume = styled(motion.div)`
  position: fixed;
  cursor: pointer;
  top: 4vh;
  left: 3vw;
  color: white;
  @media only screen and (max-width: 768px){
    font-size: 30px;
    left: 5vw;
    // h5{
    //     box-shadow: 0 0 10px 6px #9b67cf;
    //     background-color: #9b67cf;
    //     border-radius: 10px;
    // }
    }
`

const Nav = styled(motion.div)`
    position:fixed;
    background-color: #9b67cf;
    width: 100vw;
    height: 100vh;
    top: 0;
    text-align: center;
    display: flex;
    justify-content: center; 
    align-items: center;
    .menu{
        box-shadow: 0 0 5em 6em white;
        background: white;
        width: 10vw;
        border-radius: 100px;
    }
    button{
        margin-bottom: 1.8vh;
        font-size: 2vw;
        border-radius: 30px;
        padding: 0.75vh 1vw;
        &:last-child{
            margin-bottom: 0vh;
        }
    }
    a{
        text-decoration: none;
    }
    @media only screen and (max-width: 768px){
        .menu{
            box-shadow: 0 0 9vw 10vw white;
            width: 33vw;
            padding: 3vh 0;
            border-radius: 100px;
        }
        button{
            margin-right:0;
            font-size: 24px;
            border-radius: 50px;
            padding: 1.1vh 3.3vw;
            margin-bottom: 2vh;
        &:last-child{
            margin-bottom: 0vh;
        }
        }
    }
`;

const Footer = styled.div`
    position: fixed;
    bottom: 4vh;
    left: 3vw;
    color: white;
`

const Navopen = {
    entry: (open) => ({
        opacity: 0,
    }),
    animate: (open) => ({
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
          }
       
    }),
    exit: (open) => ({
        opacity: 0,
        transition: {
            duration: 0.5,
          }
       
    })
}

const item = {
    entry: { opacity: 0},
    animate: { opacity: 1}
  };


const Navigation = ({userObj}) => {
    const [open, setOpen] = useState(true);


    return(
        <AnimatePresence>
        {open?
        <Resume 
            key="whenclose"
            layout onClick={()=> setOpen(prev=>!prev)}>
            <h5><FontAwesomeIcon icon={faBars} /></h5>
        </Resume>
        :
        <>
            <Nav 
                layout
                key="whenopen"
                variants={Navopen}
                initial = "entry"
                animate= "animate"
                exit = "exit"
            >
            <Resume onClick={()=> setOpen(prev=>!prev)}>
                <h5><FontAwesomeIcon icon={faXmark} /></h5>
            </Resume>
                <div className="menu">
                    <motion.button variants={item}><Link to="/">🏠</Link> </motion.button>
                    <br/>
                    <motion.button variants={item}><Link to="/write">✏️</Link> </motion.button>
                    <br/>
                    <motion.button variants={item}><Link to="/profile">👤</Link></motion.button>
                </div>
            </Nav>

            <Footer>&copy; {new Date().getFullYear()} eunaleeeunalee</Footer>
        </>}
        </AnimatePresence>
        
    )}

export default Navigation;