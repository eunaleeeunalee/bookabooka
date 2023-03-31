import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Backhide = styled.div`
    background-color: #9b67cf;
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0; 
    display: flex;
    justify-content: center; 
    align-items: center;
`

const Innerbox = styled.div`
    position: fixed;
    top: 26vh;
    width: 40vw;
    height: 48vh;
    box-shadow: 0 0 5em 6em white;
    background: white;
    text-align: center;
    display: flex;
    justify-content: center; 
    align-items: center;
    h5{
        margin-bottom: 3vh;
        margin-top: 0;
    }

    @media only screen and (max-width: 768px){
        top: 11vh;
        height: 78vh;
        width: 70vw;
        box-shadow: 0 0 6vw 7vw white;
        h5{
            font-size: 24px;
            line-height: 30px;
        }
        input[type=submit], button{
            font-size: 14px;
            margin-bottom: 0;
            padding: 0.7vh 2vw;
        }
    }
`

const Inputbox = styled.input`
    margin-bottom: 1vh;
    @media only screen and (max-width: 768px){
        width: 100%;
    }
`

const Inputbox2 = styled.textarea`
    height: 20vh;
    @media only screen and (max-width: 768px){
        height: 30vh; 
        width: 100%;
    }
`

const Edit = ({eunwitObj, name}) =>{
    const [newTitle, setNewTitle] = useState(eunwitObj.title);
    const[newEunwit, setNewEunwit] = useState(eunwitObj.text);
    const [newAuthor, setNewAuthor] = useState(eunwitObj.author);
    const [newUrl, setNewUrl] = useState(eunwitObj.url);

    //cancel button
    const history = useHistory();
    // const goback = () => {
    //     history.go();
    // }



    const toggleEditing = () => {
        setNewEunwit(eunwitObj.text);
        setNewTitle(eunwitObj.title);
        setNewAuthor(eunwitObj.author);
        setNewUrl(eunwitObj.url);
        console.log(newEunwit);
        };

    const onSubmit = async(event) => {
        event.preventDefault();
        const EunwitText= doc(dbService, "eunwit",`${eunwitObj.id}`)
        await updateDoc(EunwitText, {
            text: newEunwit,
            title: newTitle,
            author: newAuthor,
            url: newUrl
        });
        history.go();
    }
    const onChange = (event) => {
        const{target: {value}} = event;
        setNewEunwit(value);
    }

    const onChange2 = (event) => {
        const{target: {value}} = event;
        setNewTitle(value);
    }

    const onChange3 = (event) => {
        const{target: {value}} = event;
        setNewAuthor(value);
    }

    const onChange4 = (event) => {
        const{target: {value}} = event;
        setNewUrl(value);
    }

    return(
        <Backhide>
        <Innerbox>
        <div>
        <h5>Do you want to edit sth?</h5>
        <form onSubmit={onSubmit}>
            <label>
                <Inputbox
                    value={newTitle}
                    onChange={onChange2}
                    type="text" placeholder="Book title?" maxLength="50" row="1" required/>
            </label>
            <br/>
            <label>
                <Inputbox
                    value={newAuthor}
                    onChange={onChange3}
                    type="text" placeholder="Author?" maxLength="50" row="1" required/>
            </label>
            <br/>
            <label>
                <Inputbox2 
                    value={newEunwit} 
                    onChange={onChange}
                    type="text" placeholder="Your favorit passage?" maxLength="200" row="5" required/>
            </label>
                <label>
                    <Inputbox
                        value={newUrl} 
                        onChange={onChange4}
                        type="url" placeholder="Related url or pdf link :) (optional)" row="1"/>
                
            </label>
            
            <br/>

            <input type="submit" value="✏️"/>
            {/* <button onClick={goback}>❌</button> */}
        </form>
        </div>
        </Innerbox>
        </Backhide>
    )
    
}

export default Edit;