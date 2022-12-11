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
import { getSession } from 'next-auth/react';
import CreateLetterModal from 'components/modals/CreateLetterModal';
import ShowLetterModal from 'components/modals/ShowLetterModal';

type  Props = {
    letterCount: number;
    letters: any;
    userName: string;
    userList?: string[];
}

export default function Index(props: Props) {
    const { letterCount, letters, userName, userList } = props;

    const [move, setMove] = useState(false);
    const [send, setSend] = useState(false);

    const { data } = useSWR(
        `/api/letters`,
        fetcher
    );

    const onClickSendLetter = useCallback(
        async (data: any) => {
            await postFetcher('/api/letters', data);
            location.reload();
        },
        []
    );

    // useEffect(() => {
    //     if (send) {
    //         onClickSendLetter({from, to, content});
    //         setSend(false);
    //         setMove(false);
    //     }
    // }, [from, to, content, send, onClickSendLetter]);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = (data: any) => console.log(data);

    const addressList = useMemo(() => _.map(letters, 'to'), [letters]);

    return (
        <div
            style={{
                backgroundImage: 'linear-gradient(CornflowerBlue,midnightblue, black)',
                zIndex: -9999,
            }}
            className={
                `${styles.container}
                flex
                flex-col
                divide-y
                divide-double` // TODO: double 스타일 적용
            }
        >
            <div className="divide-y">
                <div className="px-6 py-8 flex justify-between items-center">
                    <h1>{userName}의 벽난로</h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col divide-y">
                <div className="flex-1 p-3 pl-0 flex gap-3 divide-x">
                    <div className="pl-3 basis-1/4">
                        <Fireplace letters={letters} />
                    </div>
                    <div style={{zIndex:3}}className="pl-3 basis-1/4 text-gray-100">
                        <CreateLetterModal userList={userList} />
                        {/* <div className="divide-y">
                            <LetterList letters={letters} />
                        </div> */}
                        <ShowLetterModal letters={letters} />
                    </div>
                </div>
                {/* <PostOffice /> */}
                {/* <div>
                    <Charactor image="/images/run.png"  move={move} setSend={setSend}/>
                </div> */}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const session = await getSession(ctx);

    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: '/login',
    //             permanent: false,
    //         },
    //     };
    // }
    const baseUrl = `http://${ctx.req.headers.host}`;
    const { name } = ctx.query;
    const { count: letterCount } = await fetch(baseUrl + '/api/letter-count').then((res) => res.json());
    const userName = name ?? '히히'; //로그인 도입 후 userName으로
    const letters = userName ? await fetch(baseUrl + '/api/letters' + `?name=${userName}`).then((res) => res.json()) : [];
    const users = userName ? await fetch(baseUrl + '/api/users' + `?name=${userName}`).then((res) => res.json()) : [];
    const userList = _.map(users, 'name');

    return {
        props: {  letterCount, letters, userName, userList },
    };
};
