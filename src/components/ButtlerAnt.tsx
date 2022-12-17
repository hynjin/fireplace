import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useMemo,
} from 'react';
import _ from 'lodash';
import Modal from 'react-modal';
import { fetcher, postFetcher, putFetcher } from '../helper/Helper';
import { useSession } from 'next-auth/react';
import InfoModal from "components/modals/InfoModal";

type Props = {
    letters: LetterType[];
    userList?: string[];
};

export default function GiftBox(props: Props) {
    const { letters, userList } = props;
    const { data: session } = useSession();
    const user = session?.user;
    const userName =  user?.name;

    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <InfoModal userList={userList} letters={letters} open={showInfo} close={() => setShowInfo(false)} />
            <div className="absolute right-40 bottom-[200px] w-1/5 h-1/5">
                <button onClick={() => setShowInfo(true)}>
                    <img src="/images/gami.png" className="w-full h-full" />
                </button>
                <div className="absolute py-4 px-9 top-[-50%] border-4 border-black rounded-full bg-white z-10">
                <h6 className="text-black text-center leading-5">
                    안녕하세요! {userName} 주인님! 당신의 집사 일개미예용.. 벽난로 앞에
                    선물이 도착했어요! 함 열어보세용!ㅋㅋ
                </h6>
                </div>
            </div>
        </>
    );
}
