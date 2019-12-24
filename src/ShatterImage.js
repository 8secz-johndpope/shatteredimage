import React, { useEffect, useState, useRef } from 'react';
import I1 from './images/bread.jpg'

export default function ShatterImage({ numberOfSlices: numberOfFragments = 10, initialH = 350 }) {
    const [loaded, setLoaded] = useState(false);
    const [imgSize, setImgSize] = useState([]);
    const [transTime, setTransTime] = useState(4);
    const imgPositionRef = useRef();
    const containerRef = useRef();
    const sampleRef = useRef();
    const divRef = useRef([]);
    const container = {
        height: `${initialH}px`,
        position: 'relative',
        userSelect: 'none',
    }
    const fragmentDiv = {
        position: 'absolute',
        height: `${Math.ceil(initialH / numberOfFragments)}px`,
        overflow: 'hidden',
        transition: `${transTime}s ease-in-out`,
        // border:'1px dotted lightblue'
    }

    const imageStyle = {
        height: `${initialH}px`,
    }

    let targetLocation = 'translate(600px,600px) rotate(2turn)'

    useEffect(() => {
        window.addEventListener('load', onLoad);
        window.addEventListener('dblclick', onWindowClick);
        return (() => {
            window.removeEventListener('load', onLoad);
            window.addEventListener('dblclick', onWindowClick);
        });
    }, []);

    const onWindowClick = (e) => {
        e = e || window.event
        targetLocation = `translate(${Math.ceil(-imgPositionRef.current[0] + e.clientX)}px,${Math.ceil(-imgPositionRef.current[1] + e.clientY)}px)`
        transferImg();
    }
    const onLoad = () => {
        setImgSize([sampleRef.current.naturalWidth, sampleRef.current.naturalHeight]);
        let r = containerRef.current.getBoundingClientRect();
        // get image width
        let dw = Math.ceil(initialH * sampleRef.current.naturalWidth / sampleRef.current.naturalHeight);
        // put image in the middle of screen
        imgPositionRef.current = [(r.width - dw) / 2, r.y];
        setLoaded(true);
    }
    const transferImg = () => {
        // spread out the parts
        setTransTime(2);
        let dt = window.innerWidth / 2
        for (let i = 0; i < numberOfFragments * numberOfFragments; i++) {
            divRef.current[i].style.transform = `translate(${getRandomInt(dt)}px,${getRandomInt(dt)}px) rotate(${getRandomInt(numberOfFragments)+1}turn)`;
        }
        // wait transition finish, start move parts back
        setTimeout(() => {
            setTransTime(2);
            for (let i = 0; i < numberOfFragments * numberOfFragments; i++) {
                setTimeout(() => {
                    divRef.current[i].style.transform = `${targetLocation} rotate(${getRandomInt(numberOfFragments)}turn)`;
                }, getRandomInt(window.innerWidth / 2))
            }
        }, 2000);

    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const getFragmentRender = () => {
        let dw = Math.ceil(initialH * imgSize[0] / imgSize[1] / numberOfFragments);
        let ret = [];
        for (let i = 0; i < numberOfFragments; i++) {
            for (let j = 0; j < numberOfFragments; j++) {
                ret.push(<div style={{ ...fragmentDiv, top: `${Math.ceil(i * initialH / numberOfFragments)}px`, left: `${imgPositionRef.current[0] + dw * j}px`, width: `${dw}px` }} ref={(r) => { divRef.current[i * numberOfFragments + j] = r }}>
                    <img src={I1} style={{ ...imageStyle, transform: `translate(${-dw * j}px,${Math.ceil(-i * initialH / numberOfFragments)}px)` }}></img>
                </div>);
            }
        }
        return ret;
    }

    return (
        <>
            <div style={container} ref={containerRef}>
                {/* whole image to get image size information */}
                {!loaded && <img src={I1} style={imageStyle} ref={sampleRef}></img>}
                {loaded && getFragmentRender()}
            </div>
        </>
    )
}