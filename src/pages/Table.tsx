import { GetServerSideProps } from 'next';
import React, {
    useState,
    useCallback,
} from 'react';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { fetcher, postFetcher } from '../helper/Helper';
import useSWR from 'swr';
import _ from 'lodash';

export default function Table(props?: { }) {
    return (
        <div
            className={
                `
                flex
                flex-col
                divide-y`
            }
        >
            <table id="userList" className="table table-hover">
                {/* <tr>
                <th>id</th>
                <th>사용자명</th>
                <th>삭제</th>
                </tr> */}
                <tr>
                <td className="userId">1</td>
                <td>개발자앤디1</td>
                <td>
                    <button className="btn btn-danger pull-right"
                            type="button" onclick="getUserName()">삭제</button>
                </td>
                </tr>
                <tr>
                <td className="userId">2</td>
                <td>개발자앤디2</td>
                <td>
                    <button className="btn btn-danger pull-right"
                            type="button" onclick="getUserName()">삭제</button>
                </td>
                </tr>
                <tr>
                <td className="userId">3</td>
                <td>개발자앤디3</td>
                <td>
                    <button className="btn btn-danger pull-right"
                            type="button" onclick="getUserName()">삭제</button>
                </td>
                </tr>
                <tr>
                <td className="userId">4</td>
                <td>개발자앤디4</td>
                <td>
                    <button className="btn btn-danger pull-right"
                            type="button" onclick="getUserName()">삭제</button>
                </td>
                </tr>
                <tr>
                <td className="userId">5</td>
                <td>개발자앤디5</td>
                <td>
                    <button className="btn btn-danger pull-right"
                            type="button" onclick="getUserName()">삭제</button>
                </td>
                </tr>
            </table>
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
    // const baseUrl = `http://${ctx.req.headers.host}`;
    // const { count: letterCount } = await fetch(baseUrl + '/api/letter-count').then((res) => res.json());
    // const letters = await fetch(baseUrl + '/api/letters').then((res) => res.json());

    return {
        props: {   },
    };
};
