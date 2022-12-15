import { GetServerSideProps } from 'next';
import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useMemo,
} from 'react';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { fetcher, postFetcher } from '../../helper/Helper';
import useSWR from 'swr';
import _ from 'lodash';
import NextImage from 'next/image';
import Bonfire from './Bonfire';

type Props = {
    letters: LetterType[];
};

export default function Fireplace(props: Props) {
    const { letters } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const fireplaceHeight = 621;
    const fireplaceWidth = 795;

    const renderFireplace = useCallback((canvasContext) => {
        const background = new Image();
        background.src = "/images/house_background.png";
        const fireplace = new Image();
        fireplace.src = "/images/fireplace.png";

        fireplace.onload = () => {
            canvasContext.drawImage(background, 0, 0, 1920, 1080);
            canvasContext.drawImage(fireplace, 562, 255, fireplaceWidth, fireplaceHeight);

            // let index = 0;
            // for (var i = 0; i < rowCount; i++) {
            //     for (var j = 0; j < colCount; j++) {
            //         canvasContext.fillStyle = _.includes(addressList, postAdress[index]) ? "#729419" : "#000000";
            //         canvasContext.fillRect(100 + i * rowInterval, 100 + j * colInterval, windowWidth, windowfireplaceHeight );
            //         canvasContext.font = '28px serif';
            //         canvasContext.fillText(postAdress[index], 100 + i * rowInterval, 100 + j * colInterval);

            //         index++;
            //     }
            // }
        };
    }, [fireplaceHeight, fireplaceWidth]);

    useEffect(() => {
        const canvas = canvasRef?.current;
        const canvasContext = canvas?.getContext('2d');

        renderFireplace(canvasContext);
    }, [renderFireplace]);

    return (
        <div >
            <canvas 
                style={{
                    position: 'relative',
                    zIndex: -1,
                }}
                id={'canvas'} ref={canvasRef}  height={1080} width={1920} />
                <Bonfire />
        </div>
    );
}