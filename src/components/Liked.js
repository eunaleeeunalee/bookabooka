import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { dbService } from "../fbase";

const Title = styled.div`
    cursor: pointer;
    padding: 1.5vh 0 3.75vh 0;
    @media only screen and (max-width: 768px){
        padding: 2vh 0 1.5vh 0;
        line-height: 30px;
    }
`;

const Text = styled.div`
    margin: 2vh 1vw 0 1vw;
    font-weight: 100;
    font-size: 1.2vw;
    @media only screen and (max-width: 768px){
        font-size: 14px;
        line-height: 20px;
        margin: 5vh 1vw 0 1vw;
    }
`;

const Div1 = styled.div`
    width: 80%;
    float: left;
    font-weight: bolder;
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


const Liked = ({userObj, eunwits}) => {
    const [select2, setSelect] = useState(0);
    const [id, setId] = useState(eunwits[0].id);
    const [like, setLike] = useState(eunwits[0].like)
    console.log("eunwits", eunwits)

    const handleOnClilck = (e, index) => {
        setSelect(index);
    };

    const onLike =  async(id, like) =>{
        console.log(id, like)
        const filtered = like.filter((lik)=> lik !== userObj.uid)
        console.log("removed link", filtered);
        const ok2 = window.confirm("You don't like this post anymore?");
        if(ok2){
            console.log("Bye you")
            const likeuser=doc(dbService, "eunwit", `${id}`)
            await updateDoc(likeuser, {
                like: filtered
        })}
    }

    return(
        <>
            <h6>📌 Pinned post</h6>
            {eunwits.map(eunwit =>(
                <>
                {eunwit.like.includes(userObj.uid)&&
                    <Title>
                        <hr/>
                        <Div1 onClick={e => handleOnClilck(e,eunwits.indexOf(eunwit))} key={eunwit.id}>{eunwit.title}</Div1>
                        <Div2 onClick={()=>onLike(eunwit.id, eunwit.like)}>
                            <button>😀</button>
                        </Div2>
                    </Title>
                }
                {select2 === eunwits.indexOf(eunwit) &&
                        <Text key={eunwit.id + "_text"}>
                            {eunwit.text}
                            <br/>
                            <em>by {eunwit.author}</em>
                        </Text>
                }
                </>
                
            ))}

        </>
    )
}

export default Liked;