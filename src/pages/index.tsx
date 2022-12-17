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
import { getSession, signOut } from "next-auth/react";
import CreateLetterModal from "components/modals/CreateLetterModal";
import ShowLetterModal from "components/modals/ShowLetterModal";
import InfoModal from "components/modals/InfoModal";
import { useRouter } from "next/router";
import ButtlerAnt from 'components/ButtlerAnt';

type Props = {
  letterCount: any;
  letters: any;
  userList?: string[];
};

export default function Index(props: Props) {
  const { letterCount, letters, userList } = props;
  const router = useRouter();

  const { data } = useSWR(`/api/letters`, fetcher);

  return (
    <div className="relative overflow-hidden">
      <div className="fixed">
        <audio id="bgm" loop controls>
          <source src="sounds/jingle_bells.mp3" />
        </audio>
      </div>
      <ButtlerAnt letters={letters} userList={userList} />
      <Fireplace letterCount={letters?.length ?? 0} />

      <img src="/images/house_background.png" className="h-screen w-screen" />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const baseUrl = `http://${ctx.req.headers.host}`;
  const { user } = session;
  const { name } = user;
  const userName = name ?? "히히"; //로그인 도입 후 userName으로
  const groupedLetter = await fetch(baseUrl + "/api/letter-count").then((res) =>
    res.json()
  );
  const letterCount = _.keyBy(groupedLetter, "_id");
  const letters = userName
    ? await fetch(baseUrl + "/api/letters" + `?name=${userName}`).then((res) =>
        res.json()
      )
    : [];
  const users = userName
    ? await fetch(baseUrl + "/api/users" + `?name=${userName}`).then((res) =>
        res.json()
      )
    : [];
  const userList = _.map(users, "name");

  return {
    props: { letterCount, letters, userList },
  };
};
