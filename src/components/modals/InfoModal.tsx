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
    top: "80%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "scroll",
    maxHeight: "calc(100% - 48px)",
    minWidth: 600,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 40,
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
    <div className="min-w-[600px]">
      <Modal
        isOpen={open}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Letter Modal"
      >
        <h5 className="pb-4">무엇을 도와드릴까요?</h5>
        <div className="flex flex-col gap-4 relative">
          <CreateLetterModal userList={userList} />
          <ShowLetterModal letters={letters} />
          <button
            className="bg-red-700 p-3 rounded hover:bg-green-600 w-fit"
            onClick={() => router.push("/rank")}
          >
            <h6 className="text-white">3. 선물 랭킹을 확인할래 </h6>
          </button>
          <button
            className="w-fit p-3 border border-gray-300 rounded"
            onClick={() => signOut()}
          >
            <h6 className="text-gray-400 hover:text-red-400">로그아웃</h6>
          </button>
          <button
            type="button"
            className="absolute top-[-30%] right-[-5%]"
            onClick={close}
          >
            <h2 className="text-red-700">X</h2>
          </button>
        </div>
      </Modal>
    </div>
  );
}
