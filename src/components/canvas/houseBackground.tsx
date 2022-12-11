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

type Props = {
    letters: LetterType[];
};

export default function Fireplace(props: Props) {
    const { letters } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const height = 621;
    const width = 795;

    const renderFireplace = useCallback((canvasContext) => {
        const image = new Image();
        image.src = "/images/fireplace.png";    

        image.onload = () => {
            canvasContext.drawImage(image, 0, 0, width, height);

            // let index = 0;
            // for (var i = 0; i < rowCount; i++) {
            //     for (var j = 0; j < colCount; j++) {
            //         canvasContext.fillStyle = _.includes(addressList, postAdress[index]) ? "#729419" : "#000000";
            //         canvasContext.fillRect(100 + i * rowInterval, 100 + j * colInterval, windowWidth, windowHeight );
            //         canvasContext.font = '28px serif';
            //         canvasContext.fillText(postAdress[index], 100 + i * rowInterval, 100 + j * colInterval);

            //         index++;
            //     }
            // }
        };
    }, [height, width]);

    useEffect(() => {
        const canvas = canvasRef?.current;
        const canvasContext = canvas?.getContext('2d');

        renderFireplace(canvasContext);
    }, [renderFireplace]);

    return (
        <div >
            <canvas 
                style={{
                    // position: 'absolute',
                    zIndex: 0,
                }}
                id={'canvas'} ref={canvasRef}  height={height} width={width} />
            {/* <SnowFlake /> */}
        </div>
    );
}
