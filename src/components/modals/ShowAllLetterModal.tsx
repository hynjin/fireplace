import React, { useState, useRef, useCallback } from "react";
import Modal from "react-modal";
import LetterList from "components/LetterList";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

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
    minWidth: 350,
    maxWidth: 600,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {};

export default function ShowAllLetterModal(props: Props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const downloadList = useCallback(() => {
    html2canvas(listRef?.current).then((canvas) => {
      saveAs(canvas.toDataURL('image/png', "편지모아보기.png"));
    });
  }, []);

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
        shouldCloseOnOverlayClick
        onRequestClose={closeModal}
      >
      <button
        type="button"
        className="pl-[400px] flex flex-row items-center"
        onClick={downloadList}
      >
        <h6>이미지로 다운로드</h6><ArrowDownTrayIcon className="pl-2 h-6 w-6" aria-hidden="true"/>
      </button>
        <LetterList listRef={listRef} />
        <button
          type="button"
          className="p-3 border border-red-700 w-full rounded"
          onClick={downloadList}
        >
        <h6 className="text-red-700">다운로드</h6>
        </button>
        <button
          type="button"
          ref={buttonRef}
          className="p-3 mt-2 border border-red-700 bg-red-700 w-full rounded"
          onClick={closeModal}
        >
        <h6 className="text-white">닫기</h6>
        </button>
      </Modal>
    </div>
  );
}
