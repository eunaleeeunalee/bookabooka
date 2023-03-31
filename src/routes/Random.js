import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Innerbox = styled.div`
    position: fixed;
    // position: inline-block;
    width: 65vw;
    box-shadow: 0 0 4em 4em white;
    background: white; 
    // margin: 20vh 10vw;
`

const Random =() =>{
    
    return(
        <Innerbox>RANDOM</Innerbox>
    )
}

export default Random;