import React, { useState, useEffect } from "react";


const Pas = ({text}) => {
    const [taille, setTaille] = useState("3.6vw")

    
    useEffect(()=> {
        const {innerWidth: width, innerHeight: height} = window;
        console.log(width, height);
        if(text !== undefined){
        console.log(text)
        console.log("text length", text.length)
            if(width<768){
                if(50>text.length){
                    setTaille("48px");
                    console.log('48px')
                }else if(100<=text.length){
                    setTaille("22px");
                    console.log("22px")
                }else{
                    setTaille("32px");
                }
            }else{
                if(50>text.length){
                    setTaille("5.3vw");
                    console.log('5.2vw')
                }else if(100<=text.length){
                    setTaille("2.5vw");
                    console.log('2.5vw')
                }else{
                    setTaille("3.6vw");
                }
            }
        }
    },[text])

    return(
        <h4 style={{fontSize:`${taille}`}}>{text}</h4>
    )
}

export default Pas;