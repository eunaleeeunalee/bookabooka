import React, { useState, useEffect } from "react";
import { dbService, storageService } from "../fbase";
import { collection, query, orderBy, onSnapshot, addDoc, setDoc, doc, getDoc, getDocs } from "firebase/firestore";
import Eunwit from "../components/Eunwit";
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion";


const Innerbox = styled.div`
    position: fixed;
    top:19vh;
    width: 78vw;
    height: 62vh;
    box-shadow: 0 0 5vw 6vw white;
    background: white; 
    display: flex;
    justify-content: center; 
    align-items: center;
    padding: 0 1.6vw;
    @media only screen and (max-width: 768px){
        top: 11vh;
        height: 78vh;
        width: 70vw;
        box-shadow: 0 0 6vw 7vw white;
    }
`
const Posts = styled.div`
    justify-content:center;
`

const Boxs = styled.div`
    position: fixed;
    bottom: 17vh;
    left: 0;
    margin-top: 4vh;
    text-align: center;
    width: 100vw;
    

    @media only screen and (max-width: 768px){
        bottom: 12vh;
        button{
            border-radius: 50px;
        }
    }
`

const PasVari = {
    entry: (back) => ({
        x: back? 500:-500,
        opcaity: 0,
        transition: {
            duration: 0.1,
        }
    }),
    animate: (back) => ({
        x: 0,
        opcaity: 1,
        transition: {
            duration: 0.1,
        }
    }),
    exit: (back) => ({
        x: back? -500:500,
        opcaity: 0.1,
        transition: {
            duration: 0.1,
        }
    })
}


const LabelBox = styled.button`
`

const Home = ({userObj}) => {
    console.log(userObj)
    const [eunwits, setEunwits] = useState([]);
    const [first, setFirst] = useState([])
    const [number, setNumber] = useState(0);
    const [users, setUsers] = useState([]);
    const [likes, setLikes] = useState([]);
    const [back, setBack]= useState(false);
    
    //usser collection making
    if(userObj.displayName === null){
        userObj.displayName = "💁‍♀️Guest"
    }

    const info = {
      name: userObj.displayName,
      uid: userObj.uid,
      mail: userObj.email,
      text: userObj.photoURL,
    }
   
    const verify = (users) =>{
        if (users.some(user => user.id == userObj.uid)){
            console.log("already!")
        }else{
            console.log("not yet!")
            setDoc(doc(dbService, "users", userObj.uid), info);
        }
    }
    

    //switch page functioon
    const onRandom =() =>{
        const newNum = Math.floor(Math.random() * eunwits.length);
        console.log("random", newNum, number);
        setFirst(eunwits[newNum]);
    }


    const onPlus = () => {
        if (number+1 == eunwits.length){
            console.log("warning!!")
            setNumber(0);
            setFirst(eunwits[0])
            setBack(false);
            console.log(back)
        }else{
            console.log("nth!")
            setNumber((prev)=> prev+1);
            setFirst(eunwits[number+1]);
            setBack(false);
            console.log(back)
        }
    }

    const onMinus = () => {
        if (number == 0){
            console.log("warning!!")
            setNumber(eunwits.length-1);
            setFirst(eunwits[eunwits.length-1]);
            setBack(true);
            console.log(back)
        }else{
            console.log("nth!")
            setNumber((prev)=> prev-1);
            setFirst(eunwits[number-1]);
            setBack(true);
            console.log(back)
        }
    }


    
    useEffect(()=>{
        //text array
        const dbeunwits = query(collection(dbService, "eunwit"), orderBy("createdAt", "desc"));
        onSnapshot(dbeunwits, (snapshot) => {
            const eunwitArr = snapshot.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }));
            setEunwits(eunwitArr);  
            setFirst(eunwitArr[0]);
        });
        
        //user array
        const dbeunwits2 = query(collection(dbService, "users"));
        onSnapshot(dbeunwits2, (snapshot) => {
            //all the user name + id
            const userArr = snapshot.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }))
            setUsers(userArr);
            verify(userArr);
        });

    },[]);

    return(
        <>
            <Innerbox>
                <Posts>
                <Boxs>
                        <LabelBox onClick={onMinus}>👈</LabelBox>
                        <LabelBox onClick={onRandom}>🎲</LabelBox>
                        <LabelBox onClick={onPlus}>👉</LabelBox>
                    </Boxs>


                    <AnimatePresence custom={back} mode="wait">
                        <motion.div
                            key={number}
                            variants={PasVari}
                            initial="entry"
                            animate="animate"
                            exit="exit"
                            custom={back}>
                            <Eunwit
                                eunwits={eunwits}  
                                eunwitObj={first} 
                                length={first.like} 
                                isOwner={first.creatorId === userObj.uid} 
                                users={users} 
                                userObj={userObj}
                                />
                        </motion.div>
                    </AnimatePresence>
                    
                </Posts>
                
            </Innerbox>

        </>
    
    )
};

export default Home;