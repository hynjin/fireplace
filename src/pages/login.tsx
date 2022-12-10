import url from 'url';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useLayoutEffect,
} from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession, signIn } from 'next-auth/react';

type SignInType = {
    error: boolean;
};
export default function SignIn(props: SignInType) {
    const { error } = props;
    return (
        <div
            className={
                `${styles.container}
                flex
                flex-col
                divide-y
                divide-double` // ERROR! double 스타일 적용
            }
        >
            <div className="py-[80px] flex-1 flex flex-col items-center">
                {error && (
                    <p className="description error">
                        publy 계정이 아니에요 다시 로그인 해주세요
                    </p>
                )}
                누가 내 벽난로에 선물 쐈어
                <div>당신은 누구?</div>
                <button className="flex btn" onClick={() => signIn('google')}>
                    퍼블리 계정으로 시작~
                </button>
            </div>
        </div>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const { query } = url.parse(ctx.req?.url ?? '', true);
    if (query?.error === 'AccessDenied') {
    }
    return {
        props: {
            error: query?.error === 'AccessDenied',
        },
    };
};
