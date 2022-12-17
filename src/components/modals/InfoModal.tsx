import React, { useState } from "react";
import Modal from "react-modal";
import SendLetterForm from "components/SendLetterForm";
import LetterList from "components/LetterList";
import CreateLetterModal from "components/modals/CreateLetterModal";
import ShowLetterModal from "components/modals/ShowLetterModal";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";

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
  letters: LetterType[];
  userList: string[];
  open: boolean;
  close: () => void;
};

export default function InfoModal(props: Props) {
  const { letters, userList, open, close } = props;
  const router = useRouter();

  // const [modalIsOpen, setIsOpen] = useState(false);

  // function openModal() {
  //   setIsOpen(true);
  // }

  // function closeModal() {
  //   setIsOpen(false);
  // }

  return (
    <div>
      <Modal
        isOpen={open}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Letter Modal"
      >
        <button className="btn" onClick={() => router.push("/rank")}>
          <h6>랭킹 보기 </h6>
        </button>
        <CreateLetterModal userList={userList} />
        <ShowLetterModal letters={letters} />
        <button onClick={() => signOut()}>
          <h6>로그아웃</h6>
        </button>
        <button
          type="button"
          className="p-3 border border-red-700"
          onClick={close}
        >
          <h6 className="text-red-700">닫기</h6>
        </button>
      </Modal>
    </div>
  );
}
