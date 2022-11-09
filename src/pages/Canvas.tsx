import { GetServerSideProps } from 'next';
import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
} from 'react';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { fetcher, postFetcher } from '../helper/Helper';
import useSWR from 'swr';
import _ from 'lodash';
// import building from '../foundations/img/building';

type CanvasProps = {
    addressList: string[];
};

export default function Canvas(props: CanvasProps) {
    const { addressList } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buildingHeight = 1200;
  const buildingWidth = 800;

  const windowHeight = 200;
  const windowWidth = 120;

  const rowCount = 3;
  const colCount = 4;

  const rowInterval = 190;
  const colInterval = 230;

    const postAdress = ['김현진', '윤다은', '정다희', '현진', '다은', '다희', '퍼블리', '플젝', '화이팅', '히히', '해보자구', '화이팅'];
  useEffect(() => {
    const image = new Image();
    image.src = "/images/building.png";    

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');

    image.onload = () => {
        canvasContext.drawImage(image, 0, 0);

        let index = 0;
        for (var i = 0; i < rowCount; i++) {
            for (var j = 0; j < colCount; j++) {
                console.log('+++', _.includes(addressList, postAdress[index]), postAdress[index]);
                canvasContext.fillStyle = _.includes(addressList, postAdress[index]) ? "#729419" : "#000000";
                canvasContext.fillRect(100 + i * rowInterval, 100 + j * colInterval, windowWidth, windowHeight );
                canvasContext.font = '28px serif';
                canvasContext.fillText(postAdress[index], 100 + i * rowInterval, 100 + j * colInterval);

                index++;
            }
        }
    }
}, [])

    return (
        <>
            <canvas id={'canvas'} ref={canvasRef} height={buildingHeight} width={buildingWidth} className="canvas"/>
        </>
    );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     // const session = await getSession(ctx);

//     // if (!session) {
//     //     return {
//     //         redirect: {
//     //             destination: '/login',
//     //             permanent: false,
//     //         },
//     //     };
//     // }
//     // const baseUrl = `http://${ctx.req.headers.host}`;
//     // const { count: letterCount } = await fetch(baseUrl + '/api/letter-count').then((res) => res.json());
//     // const letters = await fetch(baseUrl + '/api/letters').then((res) => res.json());

//     return {
//         props: {   },
//     };
// };
