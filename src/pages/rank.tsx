import { GetServerSideProps } from "next";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { fetcher, postFetcher } from "../helper/Helper";
import useSWR from "swr";
import _ from "lodash";
import SnowFlake from "components/canvas/SnowFlake";
import { getSession } from "next-auth/react";
import { PRESENT_NAME } from "types/constants";
import { useRouter } from "next/router";

type Props = {
};

const MAX_RANK = 10;

export default function Rank(props: Props) {
  const router = useRouter();

  const { data: config = []} = useSWR(`/api/config`, fetcher);
  const blocked = useMemo(() => config?.[0]?.blocked, [config]);

  const heavySenderOption = "💌 편지 많이 보낸 사람"
  const rankOption = [heavySenderOption, ..._.values(PRESENT_NAME)];
  const [rankType, setRankType] = useState(heavySenderOption);

  const { data: letters } = useSWR(`/api/letters`, fetcher);

  const lettersGroupedByGift = useMemo(() => _.groupBy(letters, 'present'), [letters])

  const rankByGift = useMemo(() => {
    const groupedByName = _.groupBy(lettersGroupedByGift[rankType], 'reciever');

    const groupedName = {};
    _.forEach(groupedByName, (grouped, name) => {
      const count = grouped?.length ?? 0;
      if (groupedName[count]) {
        groupedName[count].push(name);
      } else {
        _.set(groupedName, count, [name]);
      }
    });
    const letterCount = _.map(groupedName, (name, count) => {
      return {
        name,
        count: Number(count),
      }
    });
    const orderedRank = _.orderBy(letterCount, 'count','desc')

    return _.take(orderedRank, MAX_RANK);
  }, [lettersGroupedByGift, rankType]);

  const rankHeavySender = useMemo(() => {
    const excludeLetters = _.filter(letters, letter => !_.includes(['Hyunjin Kim', "Dahee Jeong", "Sinyoung Park", "Hongjae Eum"], letter?.sender));
    const countLetters = _.countBy(excludeLetters, 'sender');
    const groupedName = {};
    _.forEach(countLetters, (count, name) => {
      if (groupedName[count]) {
        groupedName[count].push(name);
      } else {
        _.set(groupedName, count, [name]);
      }
    });
    const letterCount = _.map(groupedName, (name, count) => {
      return {
        name,
        count: Number(count),
      }
    });
    const orderedRank = _.orderBy(letterCount, 'count','desc')

    return _.take(orderedRank, MAX_RANK);
  }, [letters]);

  const handleChangeSelectRank = useCallback((e) => {
    setRankType(e.target.value);
  }, []);

  const getMedal = useCallback((rank: number) => {
    if (rank === 0){
      return '🥇';
    } else if (rank === 1) {
      return '🥈';
    } else if (rank === 2) {
      return '🥉';
    }
    return '';
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
          <h1 className="text-white">🏆 퍼블리 랭킹 🏆</h1>
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
              disabled={blocked}
            >
              {_.map(rankOption, (option) => (
                <option value={option} key={`rank-option-${option}`}>
                  {option}{option !== heavySenderOption && ' 많이 받은 사람'}
                </option>
              ))}
            </select>{" "}
          </h5>
        </div>
        <div className="bg-white flex flex-col flex-1 max-h-[600px] min-w-[350px] gap-8 items-center w-1/3 border my-6 py-6 px-12 border-green-800 rounded-lg bg-opacity-75  overflow-y-scroll">
          {blocked ? <img src="/images/60sec.jpeg" className="h-full w-full opacity-100 " /> :
            (rankType === heavySenderOption ? (
              _.map(rankHeavySender, (rank, index) => (
                <div key={`rank-${rankType}-${index}`} className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
                  <div className="flex flex-row w-full">
                    <h3>{index + 1}위. {getMedal(index)} </h3>
                    <div style={{whiteSpace: 'pre-wrap'}}>
                      <h3> {_.join(rank?.name, '\n ' )}</h3>
                    </div>
                  </div>
                  <h5>보낸 편지: {rank?.count}개</h5>
                </div>
                ))
            ):(
              _.map(rankByGift, (rank, index) => (
                <div key={`rank-${rankType}-${index}`} className="flex flex-col h-fit gap-2 pb-5 w-full border-0 border-b border-green-800">
                  <div className="flex flex-row w-full">
                    <h3>{index + 1}위. {getMedal(index)} </h3>
                    <div style={{whiteSpace: 'pre-wrap'}}>
                      <h3> {_.join(rank?.name, '\n ' )}</h3>
                    </div>
                  </div>
                  <h5>받은 {rankType}: {rank?.count}개</h5>
                </div>
                ))
            )
          )}
        </div>
        <h6 className="text-white pb-4">✄API을 사용한 신영과 홍재는 랭킹에서 제외되었습니다.✄</h6>
        <button
          className="bg-white w-fit p-6 rounded shadow-md"
          onClick={() => router.push("/")}
        >
          <h4>돌아가기</h4>
        </button>
      </div>
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

  return {
    props: {},
  };
};
