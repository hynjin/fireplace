import React, { useState } from "react";
import Modal from "react-modal";
import SendLetterForm from "components/SendLetterForm";
import LetterList from "components/LetterList";
import CreateLetterModal from "components/modals/CreateLetterModal";
import ShowAllLetterModal from "components/modals/ShowAllLetterModal";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";
import TutorialButton from "components/TutorialButton";

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
  open: boolean;
  close: () => void;
};

export default function InfoModal(props: Props) {
  const { open, close } = props;
  const router = useRouter();

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
          <CreateLetterModal />
          <ShowAllLetterModal />
          <button
            className="bg-red-700 p-3 rounded hover:bg-green-600 w-fit"
            onClick={() => router.push("/rank")}
          >
            <h6 className="text-white">3. 선물 랭킹을 확인할래 </h6>
          </button>
          <TutorialButton />
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
