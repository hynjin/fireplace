import React, { useState } from "react";
import Modal from "react-modal";
import SendLetterForm from "components/SendLetterForm";
import LetterList from "components/LetterList";

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
    minWidth: 600,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {
  letters: LetterType[];
};

export default function ShowLetterModal(props: Props) {
  const { letters } = props;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="min-w-[600px]">
      <button
        className="bg-red-700 p-3 rounded hover:bg-green-600 w-fit"
        onClick={openModal}
      >
        <h6 className="text-white">2. 나한테 온 편지를 모아 볼래</h6>
      </button>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Letter Modal"
      >
        <LetterList letters={letters} />
        <button
          type="button"
          className="p-3 border border-red-700"
          onClick={closeModal}
        >
          <h6 className="text-red-700">닫기</h6>
        </button>
      </Modal>
    </div>
  );
}
