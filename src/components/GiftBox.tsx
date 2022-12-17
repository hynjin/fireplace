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
    ticket: number;
    setTicket: (n: number) => void;
};

export default function GiftBox(props: Props) {
    const { letters, ticket, setTicket } = props;
    const { data: session } = useSession();
    const user = session?.user;
    const userName =  user?.name;

    const letterCount = letters?.length ?? 0;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const openAlert = useCallback(async () => {
        setAlertOpen(true);
    }, []);

    function closeAlert() {
        setAlertOpen(false);
        location.reload(); //for letter list update
    }

    const openModal = useCallback(async () => {
        if (ticket < 1) {
            openAlert();
            return;
        }

        await postFetcher('/api/letters', { letterId: letters[0]?._id });
        await postFetcher('/api/user-list', { name: userName });
        setTicket(ticket - 1);
        setIsOpen(true);
    }, [letters, openAlert, setTicket, ticket, userName]);

    function closeModal() {
      setIsOpen(false);
    }

    return (
        <div className="absolute right-40 bottom-[50px] w-2/5 h-1/5">
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Create Letter Modal"
            >
                <div>
                    {letters[0].content}
                    {letters[0].present}
                </div>
                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={closeModal}
                >
                    닫기
                </button>
            </Modal>

            <Modal
                isOpen={alertOpen}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Create Letter Modal"
            >
                <div>
                    열람권이 부족해 선물을 열 수 없어요!<br />
                    편지를 작성해 열람권을 모아보세요!
                </div>
                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={closeAlert}
                >
                    닫기
                </button>
            </Modal>

            {letterCount > 0 &&
                <button onClick={openModal}>
                    <h2 >선물 상자</h2>
                </button>
            }
        </div>
    );
}
