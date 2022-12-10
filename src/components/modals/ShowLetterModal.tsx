import React, { useState } from 'react';
import Modal from 'react-modal';
import SendLetterForm from 'components/SendLetterForm';
import LetterList from 'components/LetterList';

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
    <div>
      <button className="btn" onClick={openModal}>편지읽기</button>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Letter Modal"
      >
        <LetterList letters={letters} />
        <button
            type="button"
            className="btn btn-ghost"
            onClick={closeModal}
        >
            닫기
        </button>
      </Modal>
    </div>
  );
}