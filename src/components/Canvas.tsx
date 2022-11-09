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
import { fetcher, postFetcher } from '../helper/Helper';
import useSWR from 'swr';
import _ from 'lodash';
import SnowFlake from './SnowFlake';

type CanvasProps = {
    addressList: string[];
};

export default function Canvas(props: CanvasProps) {
    const { addressList } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const canvasHeight = 1200;
    const canvasWidth = 800;

    const windowHeight = 200;
    const windowWidth = 120;

    const rowCount = 3;
    const colCount = 4;

    const rowInterval = 190;
    const colInterval = 230;

    const postAdress = useMemo(() => ['김현진', '윤다은', '정다희', '현진', '다은', '다희', '퍼블리', '플젝', '화이팅', '히히', '해보자구', '편지'], []);

    const renderBuilding = useCallback((canvasContext) => {
        const image = new Image();
        image.src = "/images/building.png";    

        image.onload = () => {
            canvasContext.drawImage(image, 0, 0);

            let index = 0;
            for (var i = 0; i < rowCount; i++) {
                for (var j = 0; j < colCount; j++) {
                    canvasContext.fillStyle = _.includes(addressList, postAdress[index]) ? "#729419" : "#000000";
                    canvasContext.fillRect(100 + i * rowInterval, 100 + j * colInterval, windowWidth, windowHeight );
                    canvasContext.font = '28px serif';
                    canvasContext.fillText(postAdress[index], 100 + i * rowInterval, 100 + j * colInterval);

                    index++;
                }
            }
        };
    }, [addressList, postAdress]);

    useEffect(() => {
        const canvas = canvasRef?.current;
        const canvasContext = canvas?.getContext('2d');

        renderBuilding(canvasContext);
    }, [addressList, postAdress, renderBuilding]);

    return (
        <div className='position-relative'>
            <canvas 
                style={{
                    position: 'absolute',
                    zIndex: -1,
                }}
                id={'canvas'} ref={canvasRef}  height={canvasHeight} width={canvasWidth} />
            <SnowFlake />
        </div>
    );
}
