import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Edit from "./Edit";
import { doc, deleteDoc } from "firebase/firestore";
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
    margin: 2.75vh 1vw 0 1vw;
    font-weight: light;
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
            padding: 0.7vh 2vw;
            font-size: 14px;
            margin-right: 1vw;
            margin-bottom: 0;
        }    
    }
`


const Wrote = ({userObj, eunwits}) => {
    const [select, setSelect] = useState(0);
    const [editing, setEditing] = useState(false);
    console.log('wrote', eunwits)


    const handleOnClilck = (e, index) => {
        setSelect(index);
    };

    const onDeleteClick = async(id) => {
        const ok = window.confirm("R U sure?")
        console.log(ok)
        if(ok){
            const EunwitText= doc(dbService, "eunwit",`${id}`)
            await deleteDoc(EunwitText);
        }
    };

    return(
        <>
            <h6>✍️ Uploaded post</h6>
            
            {eunwits.map(eunwit => (
                <>
                {eunwit.creatorId === userObj.uid &&
                <>
                    <Title key={eunwit.id}>
                        <hr/>
                        <Div1 onClick={e => handleOnClilck(e,eunwits.indexOf(eunwit))}>{eunwit.title}</Div1>
                        <Div2>
                            <button onClick={() => setEditing(!editing)}>✂️</button>
                            <button onClick={()=>onDeleteClick(eunwit.id)}>🗑️</button>
                        </Div2>
                    </Title>
                    {editing&& <Edit eunwitObj={eunwit}/>}
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

export default Wrote;