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
import ShowLetterModal from "components/modals/ShowLetterModal";
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
          <h1 className="text-white">2023년 퍼블리 랭킹</h1>
          <div className="bg-white w-full h-[1px]" />
        </div>
      </div>
      <div
        style={{ zIndex: 100 }}
        className="flex flex-col grow h-full p-6 items-center justify-center"
      >
        <div className="h-fit flex flex-col flex-1">
          <select onChange={handleChangeSelectRank} value={rankType}>
            <option value=""></option>
            {_.map(PRESENT_NAME, (PRESENT) => (
              <option value={PRESENT} key={`creat-to-${PRESENT}`}>
                {PRESENT}
              </option>
            ))}
          </select>{" "}
          을 가장 많이 얻을 사람은?
        </div>
        <button
          className="bg-white w-fit p-6 rounded"
          onClick={() => router.push("/")}
        >
          <h3>돌아가기</h3>
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
