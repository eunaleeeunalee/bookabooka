import React, { useEffect, useState } from "react";
import { authService, dbService, storageService } from "../fbase";
import { useHistory, Link } from "react-router-dom";
import { query, where, collection, getDocs, orderBy, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";
import styled from "styled-components";
import Wrote from "../components/Wrote";
import Liked from "../components/Liked";

const Innerbox = styled.div`
    width: 68vw;
    min-height: 50vh;
    margin: 25vh 0;
    box-shadow: 0 0 5em 6em white;
    background: white;
    text-align: center;
    h5{
        margin-top:2vh;
        margin-bottom: 4vh;
    }

    @media only screen and (max-width: 768px){
        margin: 10vh 2vw;
        width: 70vw;
        min-height: 78vh;
        box-shadow: 0 0 6vw 7vw white;
        h5{
            font-size: 24px;
            line-height: 30px;
        }
        p{
            button{
                font-size: 14px;
            margin-right: 1vw;
            margin-bottom: 0;
            padding: 0.7vh 2vw;
            }
        }
    }
`

const Box = styled.div`
    margin-top: 4.5vh;
    text-align: left;
    @media only screen and (max-width: 768px){
        margin-top: 5.5vh;
    }
`

const Box2 = styled.div`
    margin-top: 6.5vh;
    text-align: center;
`

const Inputtext = styled.input`
    margin-right: 3vw;
    @media only screen and (max-width: 768px){
        width: 100%;
    }
`

const Inputtext2 = styled.textarea`
    height: 15vh;
    margin-right: 3vw;
    @media only screen and (max-width: 768px){
        height: 30vh;
        width: 100%;
    }
`

const Bobox = styled.div`
    width: 100%;
    margin-bottom: 1vh;
    input[type=submit], button{
        font-size: 1.3vw;
    }
    @media only screen and (max-width: 768px){
        input[type=submit], button{
            font-size: 16px;
        }
    }
`

const Bobox2 = styled.div`
    width: 100%;
    margin-bottom: 4vh;
    @media only screen and (max-width: 768px){
        margin-bottom: 2.5vh;
    }
`

const Left = styled.div`
    float: left;
    width: 30%;
    margin-bottom: 1vh;
    text-align: right;
    @media only screen and (max-width: 768px){
        float: none;
        text-align: left;
    }
`

const Right = styled.div`
    float: right;
    width: 65%;
    margin-bottom: 1vh;
    margin-left: 1vw;
    text-align: left;
    @media only screen and (max-width: 768px){
        float: none;
        width: 100%;
        font-size: 14px;
    }
`

const Profile = ({userObj,refreshUser}) => {
    const history = useHistory();
    const [wrote, setWrote] = useState(false);
    const [liked, setLiked] = useState(false);
    const [edit, setEdit] = useState(true);
    const [wrote2, setWrote2] = useState("white");
    const [liked2, setLiked2] = useState("white");
    const [edit2, setEdit2] = useState("#9b67cf");
    const [newName, setNewName] = useState(userObj.displayName);
    const [newText, setNewText] = useState(userObj.photoURL);
    const [eunwits, setEunwits] = useState([]);

    console.log(userObj)

    if(userObj.displayName === null){
        userObj.displayName = "Eunwitter"
    }


    //button cllick
    const clickWrote = () => {
        setWrote(true);
        setEdit(false);
        setLiked(false);
        setWrote2("#9b67cf");
        setEdit2("white");
        setLiked2("white");
    }
    
    const clickEdit = () => {
        setWrote(false);
        setEdit(true);
        setLiked(false);
        setWrote2("white");
        setEdit2("#9b67cf");
        setLiked2("white");
    }

    const clickLiked = () => {
        setLiked(true);
        setEdit(false);
        setWrote(false);
        setWrote2("white");
        setEdit2("white");
        setLiked2("#9b67cf");
    }

    //Edit profile
    const onChange=(event)=> {
        const {target: {value}} = event;
        setNewName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const Username= doc(dbService, "users",`${userObj.uid}`)

        if(userObj.displayName !== newName || userObj.photoURL !== newText){
            await updateProfile(userObj, {displayName: newName, photoURL: newText});
            await updateDoc(Username, {
                name: newName,
                text: newText
            })
            refreshUser();
        }
    }

    //edit description
    const onChange2=(event)=> {
        const {target: {value}} = event;
        setNewText(value);
    }

    //Log out
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    


    const getMyEunwit = async () => {
        const q = query(
        collection(dbService, "eunwit"),
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
        };
    
    useEffect(()=>{
        getMyEunwit();
        //text array
        const dbeunwits = query(collection(dbService, "eunwit"), orderBy("createdAt", "desc"));
        onSnapshot(dbeunwits, (snapshot) => {
            const eunwitArr = snapshot.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }));
            setEunwits(eunwitArr);  
        });
    }, [])

    return(
        <Innerbox>
            <div>
            <h5>Hello {userObj.displayName}!</h5>
            <p>
                <button style={{backgroundColor:`${wrote2}`}} onClick={clickWrote}>✍️</button>
                <button style={{backgroundColor:`${liked2}`}} onClick={clickLiked}>📌</button>
                <button style={{backgroundColor:`${edit2}`}} onClick={clickEdit}>⚙️</button>
            </p>

            <Box>
                {wrote && <Wrote eunwits={eunwits} userObj={userObj}/>}
            </Box>
            <Box>
                {liked &&
                    <> 
                    <Liked eunwits={eunwits} userObj={userObj}/>
                    </>}
            </Box>

            {edit && 
                <>
                <Box2>
                        <Bobox2>
                            <Left>User ID:</Left>
                            <Right>{userObj.uid}</Right>
                        </Bobox2>
                        <Bobox2>
                            <Left>Email:</Left>
                            <Right>{userObj.email}</Right>
                        </Bobox2>
                    <form onSubmit={onSubmit}>
                        <Bobox>
                            <Left>Username:</Left>
                            <Right>
                                <Inputtext type="text" 
                                
                                value={newName}
                                onChange={onChange} 
                                placeholder="new username?"/>
                            </Right>
                        </Bobox>
                        <br/>
                        <Bobox>
                            <Left>Description:</Left>
                            <Right>
                            <Inputtext2 type="text" 
                                value={newText}
                                onChange={onChange2} 
                                placeholder="new username?"/>
                            </Right>
                        </Bobox>
                        <br/>
                        <Bobox style={{float: "left", marginTop: "3vh"}}>
                        
                            <input type="submit" value="Edit"/>
                            <button onClick={onLogOutClick}>Log Out</button>
                        </Bobox>
                        
                    </form>
                </Box2>
                </>
            }
            

        </div>    
        </Innerbox>)
};

export default Profile;