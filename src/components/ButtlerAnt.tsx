import React, {
  useState,
} from "react";
import _ from "lodash";
import { useSession } from "next-auth/react";
import InfoModal from "components/modals/InfoModal";

type Props = {
};

export default function GiftBox(props: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name;

  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <InfoModal
        open={showInfo}
        close={() => setShowInfo(false)}
      />
      <div className="absolute right-40 bottom-[30%] w-1/5 h-1/5">
        <button className="hover:scale-110" onClick={() => setShowInfo(true)}>
          <img src="/images/gami.png" className="w-full h-full" />
        </button>
        <div className="absolute py-4 px-9 top-[-50%] border-2 border-black rounded w-fit bg-white z-10">
          <h6 className="text-black text-center leading-5 w-fit whitespace-nowrap">
            안녕! {userName}님의 집사 일개미예요.
            <br />
            저를 클릭해 편지를 보낼 수 있어요. (제발 보내줘)
            <br />
            벽난로 앞에 선물 박스가 있다면 확인해보세요!
          </h6>
        </div>
      </div>
    </>
  );
}
