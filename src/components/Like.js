import React, { useState } from "react";
import {setDoc, doc, deleteDoc } from "firebase/firestore";
import { dbService } from "../fbase";

const Like = ({eunwitObj, userObj}) =>{
    const [howmany, setHowmany] = useState(true);

    const info = {
        title: eunwitObj.title,
        text: eunwitObj.text
    }

    const onLike = () =>{
        console.log(howmany);
        if (howmany) {
            setDoc(doc(dbService, "likes", userObj.uid, userObj.uid, eunwitObj.title), info);
            setHowmany(prev=>!prev);
        }else{
            deleteDoc(doc(dbService, "likes", userObj.uid, userObj.uid, eunwitObj.title));
            setHowmany(prev=>!prev);
        }
    }

    return(
        <button onClick={onLike}>Like?</button>
    )
}

export default Like;