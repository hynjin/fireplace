import { GetServerSideProps } from 'next';
import React, {
    useState,
    useCallback,
    useMemo,
    useEffect,
} from 'react';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { fetcher, postFetcher } from '../helper/Helper';
import useSWR from 'swr';
import _ from 'lodash';
import PostOffice from 'components/PostOffice';
import SnowFlake from 'components/canvas/SnowFlake';
import Charactor from 'components/canvas/Charactor';
import LetterList from 'components/LetterList';
import SendLetterForm from 'components/SendLetterForm';
import Fireplace from 'components/canvas/Fireplace';
import { getSession, signOut } from 'next-auth/react';
import CreateLetterModal from 'components/modals/CreateLetterModal';
import ShowLetterModal from 'components/modals/ShowLetterModal';
import { useRouter } from 'next/router';

type  Props = {
    letterCount: any;
    letters: any;
    userName: string;
    userList?: string[];
}

export default function Index(props: Props) {
    const { letterCount, letters, userName, userList } = props;
    const router = useRouter();

    const [showBubble, setShowBubble] = useState(false);
    // const testSound = new Audio('sound/test.mp3');

    const { data } = useSWR(
        `/api/letters`,
        fetcher
    );

    return (
        <div className="">
            {/* <iframe src="sounds/jingle_bells.mp3"  allow="autoplay" id="bgm" style={{display: "none"}}></iframe> */}

            <audio id="bgm" loop controls>
                <source src="sounds/jingle_bells.mp3" />     
            </audio>
            <div className='absolute' style={{top: 100, left: 800, width: 500}}>
                {showBubble &&
                    <>
                        <button className='btn' onClick={() => router.push('/rank')}>랭킹 보기</button>
                        <CreateLetterModal userList={userList} />
                        <ShowLetterModal letters={letters} />
                        <button onClick={() => signOut()} >로그아웃</button>
                    </>
                }
                <h1 className='text-white'>{userName}의 벽난로</h1>
                <h2 className='text-white'>{letterCount[userName]?.count ?? 0}개의 편지</h2>
                <button onClick={() => setShowBubble(prev => !prev)}>당신눈에 이건 개미로 보입니다</button>

            </div>
            <Fireplace letters={letters} />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    const baseUrl = `http://${ctx.req.headers.host}`;
    const { user } = session;
    const { name } = user;
    const userName = name ?? '히히'; //로그인 도입 후 userName으로
    const groupedLetter = await fetch(baseUrl + '/api/letter-count').then((res) => res.json());
    const letterCount = _.keyBy(groupedLetter, '_id');
    const letters = userName ? await fetch(baseUrl + '/api/letters' + `?name=${userName}`).then((res) => res.json()) : [];
    const users = userName ? await fetch(baseUrl + '/api/users' + `?name=${userName}`).then((res) => res.json()) : [];
    const userList = _.map(users, 'name');

    return {
        props: {  letterCount, letters, userName, userList },
    };
};
