import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";
import Modal from "react-modal";
import {
  fetcher,
  postFetcher,
  getPresentInfo,
  getRandomGiftBoxImage,
} from "helper/Helper";
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
    maxHeight: "calc(100% - 200px)",
    minWidth: 600,
    maxWidth: 600,
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

  const { data: letters } = useSWR(
    `/api/letters?name=${userName}&isRead=false`,
    fetcher
  );

  const [letter, setLetter] = useState(letters?.[0]);
  const {
    sender,
    content,
    presentIndex = 0,
    present = "",
    anonymous,
  } = letter ?? {};
  const { presentName, presentImage } = getPresentInfo(present, presentIndex);

  const giftBoxUrl = useMemo(() => getRandomGiftBoxImage(), []);

  useEffect(() => {
    if (letters?.length > 0 && !letter) {
      setLetter(letters?.[0]);
    }
  }, [letters, letter]);

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

    await postFetcher("/api/letters", { letterId: letter?._id });
    await postFetcher("/api/user-list", { userName });

    setTicket(ticket - 1);
    setIsOpen(true);
  }, [letter, openAlert, setTicket, ticket, userName]);

  const closeModal = useCallback(() => {
    setLetter(letters?.[0]);
    setIsOpen(false);
  }, [letters]);

  return (
    <div className="absolute left-[30%] bottom-[50px] w-2/5 h-1/5">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Letter Modal"
      >
        <div>
          <h6 className="leading-8">
            {anonymous ? "익명" : sender} 님이 <br /> [ {present && presentName}{" "}
            ] <br /> 과(와) 함께 편지를 보냈어요.
          </h6>
          <h6 className="mt-4">
            {present && <img src={presentImage} />}
            <h6 className="mt-4">{content}</h6>
          </h6>
        </div>
        <button
          type="button"
          className="p-3 border border-red-700 rounded w-full my-4"
          onClick={closeModal}
        >
          <h6 className="text-red-700 hover:text-red-300">확인!</h6>
        </button>
      </Modal>

      <Modal
        isOpen={alertOpen}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Letter Modal"
      >
        <div>
          <h6 className="leading-8">
            열람권이 부족해 선물을 열 수 없어요!
            <br />
            편지를 작성해 열람권을 모아보세요!
          </h6>
        </div>
        <button
          type="button"
          className="w-full border border-red-700 rounded p-3 my-4 "
          onClick={closeAlert}
        >
          <h6 className="text-red-700">닫기</h6>
        </button>
      </Modal>

      {letter && (
        <button onClick={openModal} className="hover:scale-110">
          <img src={giftBoxUrl} className="w-fit h-40" />
        </button>
      )}
    </div>
  );
}
