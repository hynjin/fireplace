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
import Image from 'next/image';
import { relative } from 'path';
import { useRouter } from 'next/router'
import SnowFlake from 'components/canvas/SnowFlake';

type SignInType = {
    error: boolean;
};
export default function SignIn(props: SignInType) {
    const { error } = props;
    const router = useRouter();
    return (
        <div>
            {/* 눈송이에 버튼이 가려져서...집위로 눈이 오게 하려면 눈에 zindex주고 그 위에 투명 버튼 만들어야... */}
            <SnowFlake />
            {/* 배경만 왜 반응형으로 된거지... */}
            <button  onClick={() => router.push('/') }>
            <Image src="/images/publy_house.png" height="200" width="353" alt="" className='absolute' style={{ top: 620, left: 650, zIndex: 3}} />
            </button>
            <SnowFlake />

            <Image src="/images/intro_background.png" priority={false} height="1080" width="1920" alt="" className='relative' style={{ zIndex: -2}} />
            <div className="py-[80px] flex-1 flex flex-col items-center">
                <button className="flex p-3 absolute border rounded" style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    width: '275px',
                    height: '50px',
                    left: '690px',
                    top: '870px',
                    background: '#FFFFFF',
                    textAlign: 'center',
                    zIndex: 3,
                }}
                onClick={() => signIn('google')}>
                    집을 클릭해 선물을 확인하러 가요!
                </button>
                {error && (
                    <p className="description error">
                        publy 계정이 아니에요 다시 로그인 해주세요
                    </p>
                )}
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
