import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion"

const Middle = styled.div`
    // width: 50vw; 
    height: 33vh;
    display: flex;
    justify-content: center; 
    align-items: center;
`

const Img = styled(motion.img)`
    width: 30vw;
`

const Potato = () => {
    const {scrollYProgress} = useScroll();
    const rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 360],
    )

    return(
        <>
        <Middle
            >
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
        </Middle>
        <Middle
            >
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
        </Middle>
        <Middle
            >
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
            <Img style={{scrollYProgress, rotate, rotate}}
                src={ require('./potato.png')}/>
        </Middle>
        </>
    )
}

export default Potato;