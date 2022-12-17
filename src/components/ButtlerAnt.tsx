import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";
import Modal from "react-modal";
import { fetcher, postFetcher, putFetcher } from "../helper/Helper";
import { useSession } from "next-auth/react";
import InfoModal from "components/modals/InfoModal";

type Props = {
  letters: LetterType[];
  userList?: string[];
};

export default function GiftBox(props: Props) {
  const { letters, userList } = props;
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name;

  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <InfoModal
        userList={userList}
        letters={letters}
        open={showInfo}
        close={() => setShowInfo(false)}
      />
      <div className="absolute right-40 bottom-[30%] w-1/5 h-1/5">
        <button className="hover:scale-110" onClick={() => setShowInfo(true)}>
          <img src="/images/gami.png" className="w-full h-full" />
        </button>
        <div className="absolute py-4 px-9 top-[-50%] border-2 border-black rounded w-fit bg-white z-10">
          <h6 className="text-black text-center leading-5 w-fit whitespace-nowrap">
            안녕하세요! {userName}님의 집사 일개미예요.
            <br />
            벽난로 앞에 선물이 도착했어요! 얼른 확인해보세요.
          </h6>
        </div>
      </div>
    </>
  );
}
