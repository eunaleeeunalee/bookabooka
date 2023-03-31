import React, { useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../fbase";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Title = styled.div`
    cursor: pointer;
    padding: 1.5vh 0 3.75vh 0;
    @media only screen and (max-width: 768px){
        padding: 2vh 0 1.5vh 0;
        line-height: 30px;
    }
`;

const Div1 = styled.div`
    width: 80%;
    float: left;
    font-weight: 900;
    @media only screen and (max-width: 768px){
        width: 70%;
    }
`

const Div2 = styled.div`
    width: 20%;
    float: right;
    text-align: right;
    @media only screen and (max-width: 768px){
        width: 30%;
        button{
            font-size: 14px;
            margin-right: 1vw;
            margin-bottom: 0;
            padding: 0.7vh 2vw;
        }    
    }
`

const Text = styled.div`
    margin: 2vh 1vw 0 1vw;
    font-weight: light;
    font-size: 1.2vw;
    @media only screen and (max-width: 768px){
        font-size: 14px;
        line-height: 20px;
        margin: 5vh 1vw 0 1vw;
    }
`;


const Wrote2 = ({lastpiece, userObj}) => {
    const [eunwits, setEunwits] = useState([]);
    const [select, setSelect] = useState(0);

    const history = useHistory();


    const handleOnClilck = (e, index) => {
        setSelect(index);
    };

    const onLike =  async(id, likes) =>{
        console.log(id, likes)
        const likeuser=doc(dbService, "eunwit", `${id}`)

        if(likes.some(like => like == userObj.uid)){
            const filtered = likes.filter((lik)=> lik !== userObj.uid);
            const ok2 = window.confirm("You don't like this post anymore?");
            if(ok2){
                console.log("Bye you")
                const likeuser=doc(dbService, "eunwit", `${id}`)
                await updateDoc(likeuser, {
                    like: filtered
            })}
            history.go();
        }else{
            window.alert("You like this post!");
            console.log("Hello you")
            likes.push(userObj.uid)
            console.log("added link", likes);
            await updateDoc(likeuser, {
                like: likes
            })
            history.go();
        }}

    console.log(eunwits)
    console.log(lastpiece)
    useEffect(()=>{
        //text array
        const dbeunwits = query(collection(dbService, "eunwit"), orderBy("createdAt", "desc"));
        onSnapshot(dbeunwits, (snapshot) => {
            const eunwitArr = snapshot.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }));
            setEunwits(eunwitArr);  
        });
    },[]);


    return(
        <>
            <h6>✍️ Uploaded post</h6>
            {eunwits.map((eunwit) => (   
                <>
                    {eunwit.creatorId === lastpiece &&
                        <>
                        <Title key={eunwits.indexOf(eunwit)}>
                            <hr/>
                            <Div1 onClick={e => handleOnClilck(e,eunwits.indexOf(eunwit))}>
                                {eunwit.title}
                            </Div1>
                            <Div2 onClick={()=>onLike(eunwit.id, eunwit.like)}>
                                <button onClick={onLike}>
                                    {eunwit.like.some(like => like == userObj.uid)?
                                    <span>😀</span>:<span>😶</span>}
                                </button>
                            </Div2>
                        </Title>
                        {select === eunwits.indexOf(eunwit) &&
                            <Text key={eunwit.id + "_text"}>
                                {eunwit.text}
                                <br/>
                                <em>by {eunwit.author}</em>
                            </Text>
                        }
                        </>
                    }
                </>
            ))}
        </>
    )
}

export default Wrote2;