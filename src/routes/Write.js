import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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
        input[type=submit]{
            font-size: 14px;
            margin-bottom: 0;
            padding: 0.7vh 2vw;
        }
    }
`

const Inputbox = styled.input`
    margin-bottom: 1vh;
    width: 90%;
    @media only screen and (max-width: 768px){
        width: 100%;
    }
`

const Inputbox2 = styled.textarea`
    height: 20vh;
    width: 90%;
    @media only screen and (max-width: 768px){
        height: 30vh; 
        width: 100%;
    }
`

const Write = ({userObj}) =>{
    const [eunwit, setEunwit] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [urlClick, setUrlclick] = useState(false);

    const history = useHistory();

    const onSubmit = async(event) => {
        event.preventDefault();
        

        const eunwitPosting={
            text: eunwit,
            title: title,
            author: author,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            url: url,
            like: [],
        }
    
        await addDoc(collection(dbService, "eunwit"), eunwitPosting);
        setEunwit("");
        setTitle("");
        setAuthor("");
        setUrl("");
        history.push('/')
    }

    const onChange = (event) => {
        const {target: {value}} = event;
        setEunwit(value); 
    }

    const onChangeTitle = (event) => {
        const {target: {value}} = event;
        setTitle(value); 
    }

    const onChangeAuthor = (event) => {
        const {target: {value}} = event;
        setAuthor(value); 
    }

    const onChangeURL = (event) => {
        const {target: {value}} = event;
        setUrl(value); 
    }


    // console.log(userObj.photoURL)

    return(
        <Innerbox>
        <div>
        <h5>What are you reading?</h5>
        <form onSubmit={onSubmit}>
            <label>
                <Inputbox
                    value={title}
                    onChange={onChangeTitle}
                    type="text" placeholder="Book title?" maxLength="50" row="1" required/>
            </label>
            <br/>
            <label>
                <Inputbox
                    value={author}
                    onChange={onChangeAuthor}
                    type="text" placeholder="Author?" maxLength="50" row="1" required/>
            </label>
            <br/>
            <label>
                <Inputbox2 
                    value={eunwit} 
                    onChange={onChange}
                    type="text" placeholder="Your favorit passage?" maxLength="200" row="5" required/>
            </label>
                <label>
                    <Inputbox
                        value={url} 
                        onChange={onChangeURL}
                        type="url" placeholder="Related url or pdf link :) (optional)" row="1"/>
                
            </label>
            <br/>

            <input type="submit" value="✏️"/>
        </form>
        </div>
        </Innerbox>
    )
    
}

export default Write;