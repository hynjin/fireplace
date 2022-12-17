import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import SendLetterForm from "components/SendLetterForm";
import SentLetterModal from 'components/modals/SentLetterModal';

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
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {
  userList?: string[];
};

export default function CreateLetterModal(props: Props) {
  const { userList } = props;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [letter, setLetter] = useState<SendLetterType>(undefined);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const setSentLetter = useCallback((data) => {
    setLetter(data);
    closeModal();
  }, []);

  return (
    <div>
      <button
        className="bg-red-700 p-3 rounded hover:bg-green-600"
        onClick={openModal}
      >
        <h6 className="text-white">1. 편지를 쓸래</h6>
      </button>
      <SentLetterModal letter={letter} close={() => setLetter(undefined)}/>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Letter Modal"
      >
        <SendLetterForm userList={userList} setLetter={setSentLetter}/>
        <button
          type="button"
          className="bg-white p-3 border border-red-700 rounded w-full"
          onClick={closeModal}
        >
          <h6 className="text-red-700">닫기</h6>
        </button>
      </Modal>
    </div>
  );
}
