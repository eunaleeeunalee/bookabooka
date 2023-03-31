import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";

const Profile = styled.img`
width: 5vw;
border: 2px solid #9b67cf;
border-radius: 2.5vw
float: left;
margin-top: 1vh;
`

const Inputbox = styled.textarea`
    background-color: white;
    border-radius: 20px;
    border: 2px solid #9b67cf;
    width: 83%;
    height: 20vh;
    margin-left: 1.5vw;
    padding: 1vh 1vw;
    font-size: 1.1vw;
    color: #473D13;
    outline: none;
    line-height:140%;
    resize: none;
`

const InputBtn = styled.input`
    background-color: #9b67cf;
    color: white;
    border: none;
    padding: 1vh 0;
    margin: 1vh 0.5vw;
    width: 50%;
    font-size: 1.1vw;
    cursor: pointer;
`

const LabelBox = styled.button`
    background-color: #9b67cf;
    color: white;
    border: none;
    padding: 1vh 0;
    margin: 1vh 0;
    width: 45%;
    font-size: 1.1vw;
    cursor: pointer;
    text-align: center;
`

const InputLabel = styled.label`
`

const Preview = styled.img`
width: 100%;
`

const Factory = ({userObj}) =>{
    const [eunwit, setEunwit] = useState("");
    const [attachment, setAtt] = useState(""); 
    const onSubmit = async(event) => {
        event.preventDefault();
        let attachmentUrl = "";

        if(attachment!== ""){
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }

        const eunwitPosting={
            text: eunwit,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
    
        await addDoc(collection(dbService, "eunwit"), eunwitPosting);
        setEunwit("");
        setAtt("");
    }

    const onChange = (event) => {
        const {target: {value}} = event;
        setEunwit(value); 
    }

    //여기서는 이미지 올리기 => local 파일 웹상주소 부여 => 화면에 보이기
    const onFilechange = (event) => {
        const {target: {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            // console.log(finishedEvent);
            const {currentTarget: {result}} = finishedEvent;
            // console.log(result);
            setAtt(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearFile = () => {
        setAtt();
    }

    // console.log(userObj.photoURL)

    return(
        <form onSubmit={onSubmit}>
            <Profile src={userObj.photoURL}/>
            <Inputbox 
                value={eunwit} 
                onChange={onChange}
                type="text" placeholder="Any Potato story?" maxLength="1200" row="5" required/>
            
            <LabelBox>
            <InputLabel HTMLfor="file-upload">File</InputLabel>
            <input style={{display: "none"}} id="file-upload" type="file" accept="image/*" onChange={onFilechange}/>
            </LabelBox>

            <InputBtn type="submit" value="Post"/>
            {attachment &&
                <>
                <Preview src={attachment}/>
                <button onClick={onClearFile}>Clear</button>
                </>
            }
        </form>
    )
    
}

export default Factory;