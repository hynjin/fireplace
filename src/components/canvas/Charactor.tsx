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
    setSend: (t: any) => void;
    move: boolean;
};

export default function Charactor(props: CharactorProps) {
    const { image, setSend, move } = props;

    const charactorRef = useRef<HTMLCanvasElement>(null);
    
    const charactorImage = useRef<HTMLImageElement>();
    const postboxImage = useRef<HTMLImageElement>();

        // Define the size of a frame
    let frameWidth = 120;
    let frameHeight = 130;

    // Rows and columns start from 0
    let row = useRef(0);
    let column = useRef(0);

    let x = useRef(0);

    const intervalId = useRef(null);
    const [stop, setStop] = useState(true);

    // useEffect(() => {
    //     if (stop) {
    //         row.current = 1;
    //     } else {
    //         row.current = 0;
    //     }
    // }, [stop]);

    const renderCharactor = useCallback( (charactorImage) => {
        const charactor = charactorRef?.current;
        const charactorContext = charactor?.getContext('2d');
        // charactorContext.drawImage(charactorImage, column.current*frameWidth, row.current*frameHeight, frameWidth, frameHeight, , frameWidth, frameHeight);
        charactorContext.clearRect(x.current + 930, 0, frameHeight, frameWidth);
        charactorContext.drawImage(charactorImage, column.current*frameWidth, row.current*frameHeight, frameWidth, frameHeight, x.current + 930, 0, frameWidth, frameHeight);

        column.current < 15 ? column.current++ : column.current = 0;
        console.log(x.current);
        if (x.current < -598) {
            row.current = 1;
        }
        if (x.current < -600) {
            setStop(true);
            setSend(true);
            clearInterval(intervalId.current);
        }
        x.current -= 6;
    }, [frameHeight, frameWidth, setSend]);

    useEffect(() => {
        charactorImage.current = new Image();
        charactorImage.current.src = image;
    
        postboxImage.current = new Image();
        postboxImage.current.src = '/images/postbox.png';

        const charactor = charactorRef?.current;
        const charactorContext = charactor?.getContext('2d');

        charactorImage.current.onload = () => {
            if (!intervalId.current) {
                setStop(false);
                // intervalId.current = setInterval(() => renderCharactor( charactorImage.current), 100);
            }
            charactorContext.drawImage(charactorImage.current, 0, frameHeight, frameWidth, frameHeight, 930, 0, frameWidth, frameHeight);
        };

        postboxImage.current.onload = () => {
            charactorContext.drawImage(postboxImage.current, 1060, 0, 100,100);

        }
    }, [frameHeight, frameWidth, image, renderCharactor]);


    useEffect(() => {
        if (move) {
            if (!intervalId.current) {
                setStop(false);
                intervalId.current = setInterval(() => renderCharactor( charactorImage.current), 100);
            }
        }
    }, [move, renderCharactor]);

    return (
        <canvas
        style={{
            position: 'absolute',
            zIndex: 1,
            top: 1150,
        }}
            id={'charactor'} ref={charactorRef}  height={frameHeight} width={3000} />
    );
}
