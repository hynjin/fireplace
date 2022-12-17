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
import GiftBox from 'components/GiftBox';

type Props = {
  letters: any;
  userList?: string[];
  userInfo?: any;
  userName: string;
};

export default function Index(props: Props) {
  const {  userName } = props;
  const router = useRouter();

  const { data: letters } = useSWR(`/api/letters?name=${userName}`, fetcher);
  const { data: users } = useSWR(`/api/user-list`, fetcher);

  const userList = useMemo(() => _.difference(_.map(users, 'name'), [userName]), [users, userName]);
  const userInfo = useMemo(() => _.find(users, { 'name': userName }), [users, userName]);

  const [ticket, setTicket] = useState(0);
  useEffect(() => {
    setTicket(userInfo?.ticket ?? 0);
  }, [userInfo]);

  return (
    <div className="relative overflow-hidden">
      <div className="fixed top-5 left-5">
        <audio id="bgm" loop controls>
          <source src="sounds/jingle_bells.mp3" />
        </audio>
      </div>
      <ButtlerAnt letters={letters} userList={userList} />
      <Fireplace letterCount={letters?.length ?? 0} />
      <GiftBox ticket={ticket} setTicket={(n: number) => setTicket(n)} />
      <div className="fixed top-5 right-5">
          <h3 className="text-white text-center">남은 열람권 {ticket}</h3>
      </div>

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

  const letters = userName
    ? await fetch(baseUrl + "/api/letters" + `?name=${userName}`).then((res) =>
        res.json()
      )
    : [];
  const users = await fetch(baseUrl + "/api/user-list").then((res) =>
        res.json()
      );
  const userList = _.difference(_.map(users, 'name'), [userName]);
  const userInfo = _.find(users, { 'name': userName }) ;

  return {
    props: { letters, userList, userInfo, userName },
  };
};
