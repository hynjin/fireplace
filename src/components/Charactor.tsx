import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useMemo,
} from 'react';
import _ from 'lodash';

type CharactorProps = {
    image: string;
};

export default function Charactor(props: CharactorProps) {
    const { image } = props;

    const charactorRef = useRef<HTMLCanvasElement>(null);

        // Define the size of a frame
    let frameWidth = 320;
    let frameHeight = 350;

    // Rows and columns start from 0
    let row = useRef(0);
    let column = useRef(0);

    let x = useRef(0);

    const intervalId = useRef(null);
    const [stop, setStop] = useState(false);

    const renderCharactor = useCallback( (charactorImage) => {
        const charactor = charactorRef?.current;
        const charactorContext = charactor?.getContext('2d');
        charactorContext.drawImage(charactorImage, column.current*frameWidth, row.current*frameHeight, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
        charactorContext.clearRect(0, 0, frameHeight, frameWidth);
        charactorContext.drawImage(charactorImage, column.current*frameWidth, row.current*frameHeight, frameWidth, frameHeight, x.current, 0, frameWidth, frameHeight);

        column.current < 16 ? column.current++ : column.current = 0;
        if (x.current > 240) {
            console.log(x.current);
            setStop(true);
            clearInterval(intervalId.current);
        }
        x.current += 3;
    }, [frameHeight, frameWidth]);

    useEffect(() => {
        const charactorImage = new Image();
        charactorImage.src = image;

        charactorImage.onload = () => {
            console.log('????? d');
            // renderCharactor( charactorImage);
            if (!intervalId.current)
            intervalId.current = setInterval(() => renderCharactor( charactorImage), 150);
        };
    }, [image,, renderCharactor]);


    return (
        <canvas 
            id={'charactor'} ref={charactorRef}  height={frameHeight} width={frameWidth} />
    );
}
