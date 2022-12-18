import { GetServerSideProps } from "next";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { fetcher, postFetcher } from "../helper/Helper";
import useSWR from "swr";
import _ from "lodash";
import PostOffice from "components/PostOffice";
import SnowFlake from "components/canvas/SnowFlake";
import Charactor from "components/canvas/Charactor";
import LetterList from "components/LetterList";
import SendLetterForm from "components/SendLetterForm";
import Fireplace from "components/canvas/Fireplace";
import { getSession } from "next-auth/react";
import CreateLetterModal from "components/modals/CreateLetterModal";
import ShowAllLetterModal from "components/modals/ShowAllLetterModal";
import { PRESENT_NAME } from "types/constants";
import { useRouter } from "next/router";

type Props = {
  letterCount: number;
  letters: any;
  userName: string;
  userList?: string[];
};

export default function Rank(props: Props) {
  const { letterCount, letters, userName, userList } = props;
  const router = useRouter();
  // const groupedLetter = _.groupby(letters, 'present');
  const [rankType, setRankType] = useState("");

  const { data } = useSWR(`/api/letters`, fetcher);
  // console.log('+++ ran', groupedLetter);
  const handleChangeSelectRank = useCallback((e) => {
    setRankType(e.target.value);
  }, []);

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgb(16 185 129),rgb(21 94 117))",
      }}
      className="relative flex flex-col overflow-hidden w-screen h-screen"
    >
      <SnowFlake />
      <div className="flex flex-col h-fit">
        <div className="px-6 py-8 flex flex-col justify-between items-center gap-6">
          <h1 className="text-white">🏆 2023년 퍼블리 랭킹 🏆</h1>
          <div className="bg-white w-full h-[1px]" />
        </div>
      </div>
      <div
        style={{ zIndex: 100 }}
        className="flex flex-col grow h-full p-6 items-center justify-center"
      >
        <div className="h-fit flex flex-col">
          <h5 className="w-full">
            <select
              className="p-3 rounded w-full"
              onChange={handleChangeSelectRank}
              value={rankType}
            >
              <option value=""></option>
              {_.map(PRESENT_NAME, (PRESENT) => (
                <option value={PRESENT} key={`creat-to-${PRESENT}`}>
                  {PRESENT}
                </option>
              ))}
            </select>{" "}
          </h5>
          <h5 className="text-white mt-2">을 가장 많이 얻은 사람은?</h5>
        </div>
        <div className="bg-white flex flex-col flex-1 max-h-[600px] gap-8 items-center w-1/3 border my-6 py-6 px-12 border-green-800 rounded-lg opacity-75 overflow-y-scroll">
          <div className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
            <h3>1위. 🥇 hyunjin kim</h3>
            <h5>보낸 편지: n개</h5>
          </div>

          <div className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
            <h3>1위. 🥇 hyunjin kim</h3>
            <h5>보낸 편지: n개</h5>
          </div>

          <div className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
            <h3>1위. 🥇 hyunjin kim</h3>
            <h5>보낸 편지: n개</h5>
          </div>

          <div className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
            <h3>1위. 🥇 hyunjin kim</h3>
            <h5>보낸 편지: n개</h5>
          </div>

          <div className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
            <h3>1위. 🥇 hyunjin kim</h3>
            <h5>보낸 편지: n개</h5>
          </div>

          <div className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
            <h3>1위. 🥇 hyunjin kim</h3>
            <h5>보낸 편지: n개</h5>
          </div>

          <div className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
            <h3>1위. 🥇 hyunjin kim</h3>
            <h5>보낸 편지: n개</h5>
          </div>

          <div className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
            <h3>1위. 🥇 hyunjin kim</h3>
            <h5>보낸 편지: n개</h5>
          </div>
        </div>
        <button
          className="bg-white w-fit p-6 rounded shadow-md"
          onClick={() => router.push("/")}
        >
          <h4>돌아가기</h4>
        </button>
      </div>
      {/* <div className="flex-1 flex flex-col divide-y">
                <div className="flex-1 p-3 pl-0 flex gap-3 divide-x">
                    <div className="pl-3 basis-1/4">
                        <Fireplace letters={letters} />
                    </div>
                </div>
            </div> */}
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
  // const { count: letterCount } = await fetch(baseUrl + '/api/letter-count').then((res) => res.json());
  const userName = name ?? "히히"; //로그인 도입 후 userName으로
  const letters = await fetch(baseUrl + "/api/letters").then((res) =>
    res.json()
  );
  // const ranking = await fetch(baseUrl + '/api/rank').then((res) => res.json());
  const users = userName
    ? await fetch(baseUrl + "/api/users" + `?name=${userName}`).then((res) =>
        res.json()
      )
    : [];
  const userList = _.map(users, "name");
  // console.log('+++ rnak', letters);
  return {
    props: { letterCount: 0, letters, userName, userList },
  };
};
