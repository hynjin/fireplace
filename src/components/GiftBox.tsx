import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useMemo,
} from 'react';
import _ from 'lodash';
import Modal from 'react-modal';
import { fetcher, postFetcher, putFetcher } from '../helper/Helper';
import { useSession } from 'next-auth/react';

const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      overflow: 'auto',
      zIndex: 30,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      overflow: 'scroll',
      maxHeight: 'calc(100% - 48px)',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

type Props = {
    letters: LetterType[];
};

export default function GiftBox(props: Props) {
    const { letters } = props;
    const { data: session } = useSession();
    const user = session?.user;
    const userName =  user?.name;

    const [modalIsOpen, setIsOpen] = useState(false);

    const letterCount = letters?.length ?? 0;
    const randomIndex = useMemo(() => letterCount > 0 ? Math.floor((Math.random() * letterCount)) : 0, [letterCount]);

    const openModal = useCallback(async () => {
        console.log('+++ open', randomIndex, letters[randomIndex], letters[randomIndex]?._id);
        await postFetcher('/api/letters', { letterId: letters[randomIndex]?._id });
        await postFetcher('/api/user-list', { name: userName });
        setIsOpen(true);
    }, [randomIndex, letters, userName]);

    function closeModal() {
      setIsOpen(false);
    }


    return (
        <>
            <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Create Letter Modal"
            >
                <div>
                    GiftBox
                    {letters[randomIndex].content}
                    {letters[randomIndex].present}
                </div>
                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={closeModal}
                >
                    닫기
                </button>
            </Modal>
            <button onClick={openModal}>
                <h2 className='text-white'>선물 상자</h2>
            </button>
        </>
    );
}
