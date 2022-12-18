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
    minWidth: 450,
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
        <div className="p-6 flex gap-6 justify-center justify-between">
          <div className="flex flex-col">
            <h6 className="py-3 px-6 border border-black rounded-full leading-6">
              편지를 보내는 방법과
              <br /> 간단한 규칙을 설명해드릴게요!
            </h6>
            <img src="/images/gami_02.png" className="h-60 w-fit" />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="py-3 mx-auto text-center mb-4"> 💡 튜토리얼 💡</h2>
            <div className="py-4 px-8 bg-gray-100 rounded-lg">
              <h5 className="leading-10">
                1. 열람권을 이용해 나에게 도착한 편지를 읽을 수 있어요.
                <br />
                2. 열람권은 처음 1개가 주어지며, 다른 사람에게 편지를 보내면
                얻을 수 있어요.
                <br />
                3. 편지는 일개미를 통해 보낼 수 있어요.
                <br />
                4. 실시간 랭킹은 일개미를 통해 확인 가능해요.
                <br />
                5. 가장 많은 편지를 보낸 사람에겐 깜짝 선물이 있어요!
                <br />
                6. 버그는 알아서 해결하거나 무시해주세요.^^
                <br />
                (단, 받을 사람 이름이 없는 경우엔 현진에게 슬며시 디엠을
                보내주세요.)
              </h5>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="p-3 border border-red-700 rounded w-full px-8 my-4 "
          onClick={closeModal}
        >
          <h6 className="text-red-700 hover:text-red-300 ">확인!</h6>
        </button>
      </Modal>

      <button onClick={openModal} className="hover:scale-110">
        <img src={giftBoxUrl} className="w-fit h-40" />
      </button>
    </div>
  );
}
