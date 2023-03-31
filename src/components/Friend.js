import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Wrote2 from "./Wrote2";
import { useHistory } from "react-router-dom";
import { query, collection, onSnapshot } from "firebase/firestore";
import { dbService } from "../fbase";

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
    }
`

const Box = styled.div`
    margin-top: 6vh;
    text-align: left;
`

const Box2 = styled.div`
    margin-top: 4.5vh;
    text-align: center;
`


const Friend = ({who, userObj}) => {
    const [users, setUsers] = useState([]);

    const adress = window.location.href;
    const new_adress = adress.split('/').pop()
    console.log(new_adress, typeof new_adress);

    //go back button
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }

    useEffect(()=>{
        //user array
        const dbeunwits = query(collection(dbService, "users"));
        onSnapshot(dbeunwits, (snapshot) => {
            //all the user name + id
            const userArr = snapshot.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }))
            setUsers(userArr);
            console.log("text", userArr.text)
        });
       
    },[]);

    return(
        <Innerbox>
            {users.map(user => (
                <>
                {user.uid === new_adress &&
                    <>
                        <h5 onClick={goBack} key={user.uid}> {user.name}'s page</h5>
                        <Box2>
                            {user.text == "" ? <span>No description yet!</span>:<span>{user.text}</span>}
                            <br/>
                            <a href={`mailto:${user.mail}`}>{user.mail}</a>
                        </Box2>
                    </>
                }
                
                </>
            ))}

            <Box>
                <Wrote2 userObj={userObj} lastpiece={new_adress}/>
            </Box>
        </Innerbox>
    )
}

export default Friend;