import React, { useState, useEffect } from "react";
import { dbService, storageService, authService } from "../fbase";
import { doc, deleteDoc, updateDoc, onSnapshot, query, collection, setDoc, arrayUnion } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis
  } from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import Pas from "./Passage";
import Edit from "./Edit";

const Bigbox = styled.div`
    text-align: right;
    margin-top: 1vh;
    @media only screen and (max-width: 768px){
        margin-top: 2vh;
    }
`

const Fold = styled.div`
  display: inline-block;
  @media only screen and (max-width: 768px){
    // margin-top: 1vh;
    button{
        font-size: 14px;
        margin-right: 1vw;
        margin-bottom: 0;
        margin-top: 1vh;
        padding: 0.7vh 2vw;
    }
    }
`;

const Dotdot = styled.div`
    display: inline-block;
    margin-left: 0.6vw;
    cursor: pointer;
    margin-top: 1vh;
    @media only screen and (max-width: 768px){
        margin-top: 1.5vh;
    }
`

const Friend = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;


const Eunwit = ({eunwitObj, isOwner, users, userObj, length}) => {
    const[editing, setEditing] = useState(false);
    const [resume, setResume] =useState(false);
    const [heart, setHeart] = useState("");
    const [phone, setPhone] = useState(false);


    const history = useHistory();
    const onBoxClicked = (who) => {
        history.push(`/friend/${who}`);
    }

    //data.now() to when
    const date= eunwitObj.createdAt;
    const sowhen = new Date(date);
    const year = sowhen.getFullYear().toString().slice(-2); //년도 뒤에 두자리
    const month = ("0" + (sowhen.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    const day = ("0" + sowhen.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    const soresult =  day + "/" + month + "/" +year;
    console.log(soresult)

    //deleting
    const onDeleteClick = async() => {
        const ok = window.confirm("R U sure?")
        console.log(ok)
        if(ok){
            const EunwitText= doc(dbService, "eunwit",`${eunwitObj.id}`)
            await deleteDoc(EunwitText);
        }
    };

    //like
    const onLike = async (event) => {
        event.preventDefault();
        let likes = eunwitObj.like;
        console.log(likes)
        const likeuser=doc(dbService, "eunwit", `${eunwitObj.id}`)

        if(likes.some(like => like == userObj.uid)){
            const ok2 = window.confirm("You don't like this post anymore?");
            if(ok2){
                console.log("Bye you")
                const filtered = likes.filter((like)=> like !== userObj.uid)
                console.log("removed link", filtered);
                await updateDoc(likeuser, {
                    like: filtered
            })}
            setResume(false);
        }else{
            window.alert("You like this post!");
            console.log("Hello you")
            likes.push(userObj.uid)
            console.log("added link", likes);
            await updateDoc(likeuser, {
                like: likes
            })
            setResume(false);
        }}

    //if open like
    const onHowmany = () => {
        setResume((prev)=>!prev);
        if(length !== undefined){
            if(length.some(leng => leng == userObj.uid)){
                setHeart("😀")
            }else{
                console.log('nothingg yet')
                setHeart("😶")
            }
    }}

    useEffect(()=>{
        setResume(false);
        const {innerWidth: width, innerHeight: height} = window;
        console.log(width, height);
        if(width<768){
            setPhone(true);
        }
    },[eunwitObj.id])

    return(
        <div>
            {editing? (
                <Edit eunwitObj={eunwitObj} name={userObj.displayName}/>
            ):(
            <>
                <Pas 
                    
                    text={eunwitObj.text}/>
                <Bigbox>
                    <p>
                        {eunwitObj.url !== "" ?
                            <a href={eunwitObj.url}>{eunwitObj.title}</a>:<span>{eunwitObj.title}</span>
                        }
                        <em> by {eunwitObj.author}</em>
                    </p>

                    
                    {resume && <Fold>
                                
                                shared by&nbsp;
                                {userObj.uid === eunwitObj.creatorId ?
                                    <Link to="/profile">{userObj.displayName}</Link>
                                    
                                    :<span>{users.map(user => (
                                        <span>
                                            {user.uid === eunwitObj.creatorId &&
                                                <Friend onClick = {() => onBoxClicked(eunwitObj.creatorId)}>{user.name}</Friend>
                                    }</span>
                                    ))}</span>
                                }
                                 &nbsp;at {soresult}&nbsp;
                                 {phone && 
                                    <><Dotdot onClick={onHowmany}><FontAwesomeIcon icon={faEllipsis} /></Dotdot><br/></>
                                    }
                                 <button onClick={onLike}>
                                    {heart}
                                </button>
                                {isOwner && <>
                                    <button onClick={() => setEditing(!editing)}>✂️</button>
                                    <button onClick={onDeleteClick}>🗑️</button>
                                </>
                                }
                        
                        </Fold>}
                    
                    {phone? 
                        <>{resume? null:
                            <Dotdot onClick={onHowmany}><FontAwesomeIcon icon={faEllipsis} /></Dotdot>}</>
                        :<Dotdot onClick={onHowmany}><FontAwesomeIcon icon={faEllipsis} /></Dotdot>}
                </Bigbox>
                
                
            </>
            )}
        </div>
)}

export default Eunwit;