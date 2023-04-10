import React, { useCallback, useRef, useState } from 'react';
import { Sprite, Stage, usePixiTicker } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Head from 'next/head';

const bunny = "https://i.imgur.com/IaUrttj.png";

const height = 450;
const width = 600;
const OPTIONS = {
    backgroundColor: 0x1099bb,
    height: height,
    width: width
};

interface Props {
    x: number;
    y: number;
    texture: PIXI.Texture;
}

function Bunny(props: any) {
    return (
        <Sprite anchor="0.5,0.5" texture={PIXI.Texture.from(bunny)} {...props} />
    );
}

function RotatingBunny(props: any) {
    const [rotation, setRotation] = useState(0);
    const animate = useCallback((delta: number) => {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent tranformation
        setRotation((rotation) => rotation + 0.1 * delta);
    }, []);
    usePixiTicker(animate);

    return <Bunny {...props} rotation={rotation} />;
}

export default function TestPage({ x, y, texture }: Props) {
    return (
        <>
            <Head>
                <title>Test Page</title>
            </Head>
            <Stage options={OPTIONS}>
                <RotatingBunny x={width / 2} y={height / 2} />
            </Stage>
        </>
    )
};