import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";
import Modal from "react-modal";
import { fetcher, postFetcher, getRandomGiftBoxImage } from "../helper/Helper";
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
  setDoneTutorial: () => void;
};

export default function TutorialGiftBox(props: Props) {
  const { setDoneTutorial } = props;
  const { data: session } = useSession();
  const user = session?.user;
  const name = user?.name;
  const userId = user?.userId;

  const giftBoxUrl = useMemo(() => getRandomGiftBoxImage(), []);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(async () => {
    await postFetcher("/api/user-list", { userId, name });
    setDoneTutorial();
    setIsOpen(false);
  }, [userId, name, setDoneTutorial]);

  return (
    <div className="absolute left-[40%] bottom-[50px] w-2/5 h-1/5">
      <Modal
        isOpen={isOpen}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Letter Modal"
      >
        <div>
          튜토리얼
        </div>
        <button
          type="button"
          className="p-3 border border-red-700 rounded w-full my-4"
          onClick={closeModal}
        >
          <h6 className="text-red-700 hover:text-red-300">확인!</h6>
        </button>
      </Modal>

        <button onClick={openModal} className="hover:scale-110">
          <img src={giftBoxUrl} className="w-fit h-40" />
        </button>
    </div>
  );
}
