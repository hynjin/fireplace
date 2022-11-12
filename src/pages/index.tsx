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
import Building from 'components/Building';
import PostOffice from 'components/PostOffice';
import SnowFlake from 'components/SnowFlake';
import Charactor from 'components/Charactor';

export default function News(props: { letterCount: number; letters: any }) {
    const { letterCount, letters } = props;

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [content, setContent] = useState('');

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

    useEffect(() => {
        if (send) {
            onClickSendLetter({from, to, content});
            setSend(false);
            setMove(false);
        }
    }, [from, to, content, send, onClickSendLetter]);

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
            <SnowFlake />
            <div className="divide-y">
                <div className="px-6 py-8 flex justify-between items-center">
                    <h1>Post Office</h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col divide-y">
                <div className="p-3 flex justify-between items-center">
                    <h2 className="p-3">
                        {letterCount} / 61 명
                    </h2>
                </div>
                <div className="flex-1 p-3 pl-0 flex gap-3 divide-x">
                    <div className="pl-3 basis-1/4">
                        <Building addressList={addressList}/>
                    </div>
                    <div style={{zIndex:3}}className="pl-3 basis-1/4">
                        <form className="py-3">
                            <input
                                className="input"
                                placeholder="from"
                                type="text"
                                value={from}
                                onChange={e => setFrom(e.target.value)}
                            />
                            <input
                                className="input"
                                placeholder="to"
                                type="text"
                                value={to}
                                onChange={e => setTo(e.target.value)}
                            />
                            <textarea
                                className="input"
                                placeholder="letter"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => setMove(true)} //onClickSendLetter({from, to, content})}
                            >
                                편지 쓰기
                            </button>
                        </form>
                        <div className="divide-y">
                            {_.map(letters, (letter, index) => {
                                return (
                                    <div key={index} >
                                        <div>from {letter.from}</div>
                                        <div>to {letter.to}</div>
                                        <div>{letter.content}</div>
                                        <div>{letter.updated_at}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/* <PostOffice /> */}
                <div>
                    <Charactor image="/images/run.png"  move={move} setSend={setSend}/>
                </div>
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
    const { count: letterCount } = await fetch(baseUrl + '/api/letter-count').then((res) => res.json());
    const letters = await fetch(baseUrl + '/api/letters').then((res) => res.json());

    return {
        props: {  letterCount, letters },
    };
};
