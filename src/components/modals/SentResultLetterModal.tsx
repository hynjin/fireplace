import React, { useState } from "react";
import Modal from "react-modal";
import { getPresentInfo } from "helper/Helper";

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
    minWidth: 400,
    maxWidth: 400,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {
  letter?: SendLetterType;
  presentIndate?: number;
  close: () => void;
};

export default function SentResultLetterModal(props: Props) {
  const { letter, close } = props;
  const { reciever, presentIndex = 0, present = "" } = letter ?? {};

  const { presentName } = getPresentInfo(present, presentIndex);

  return (
    <div className="min-w-[600px]">
      <Modal
        isOpen={!!letter}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Letter Modal"
      >
        <div className="p-4 flex flex-col justify-center">
          <h4 className="leading-8">
            {reciever}님에게
            {present &&  <><br />{`[ ${presentName} ]`}<br />
            과(와) 함께</>} 편지를 보냈어요.
          </h4>
        </div>
        <button
          type="button"
          className="p-3 border border-red-700 w-full my-4"
          onClick={close}
        >
          <h6 className="text-red-700 hover:text-red-300">확인!</h6>
        </button>
      </Modal>
    </div>
  );
}
