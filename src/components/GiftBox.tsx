import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";
import Modal from "react-modal";
import { fetcher, postFetcher } from "../helper/Helper";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    overflow: "auto",
    zIndex: 30,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "scroll",
    maxHeight: "calc(100% - 48px)",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {
  ticket: number;
  setTicket: (n: number) => void;
};

export default function GiftBox(props: Props) {
  const { ticket, setTicket } = props;
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const { data: letters } = useSWR(`/api/letters?name=${userName}&isRead=false`, fetcher);
  const letterCount = letters?.length ?? 0;

  const letter = useMemo(() => letters?.[0], [letters]);

    const openAlert = useCallback(async () => {
        setAlertOpen(true);
    }, []);

    function closeAlert() {
        setAlertOpen(false);
    }

    const openModal = useCallback(async () => {
        if (ticket < 1) {
            openAlert();
            return;
        }

        await postFetcher('/api/letters', { letterId: letter?._id });
        await postFetcher('/api/user-list', { name: userName });

        setTicket(ticket - 1);
        setIsOpen(true);
    }, [letter, openAlert, setTicket, ticket, userName]);

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
                    {letter?.content}
                    {letters?.present}
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
          열람권이 부족해 선물을 열 수 없어요!
          <br />
          편지를 작성해 열람권을 모아보세요!
        </div>
        <button type="button" className="btn btn-ghost" onClick={closeAlert}>
          닫기
        </button>
      </Modal>

      {letter && (
        <button onClick={openModal} className="hover:scale-110">
          <img src="/images/gift01.png" className="w-fit h-40" />
        </button>
      )}
    </div>
  );
}
