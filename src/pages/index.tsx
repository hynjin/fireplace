import { GetServerSideProps } from 'next';
import React, {
    useState,
    useCallback,
    useMemo,
} from 'react';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { fetcher, postFetcher } from '../helper/Helper';
import useSWR from 'swr';
import _ from 'lodash';
import Canvas from './Canvas';

export default function News(props: { letterCount: number; letters: any }) {
    const { letterCount, letters } = props;

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [content, setContent] = useState('');

    const { data } = useSWR(
        `/api/letters`,
        fetcher
    );

    const onClickSendLetter = useCallback(
        async (data: any) => {
            await postFetcher('/api/letters', data);
        },
        []
    );

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = (data: any) => console.log(data);

    const addressList = useMemo(() => _.map(letters, 'to'), [letters]);

    return (
        <div
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
                    <h1>Post Office</h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col divide-y">
                <div className="p-3 flex justify-between items-center">
                    <h2 className="p-3">
                        {letterCount} / 61 명
                    </h2>
                </div>
                
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
                        type="submit"
                        className="btn btn-light"
                        onClick={() => onClickSendLetter({from, to, content})}
                    >
                        편지 쓰기
                    </button>
                </form>
            <div className="divide-y">
                <Canvas addressList={addressList}/>
                {_.map(letters, (letter, index) => {
                    return (
                        <div key={index}>
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
