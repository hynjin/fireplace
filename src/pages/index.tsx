import { GetServerSideProps } from "next";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { fetcher } from "../helper/Helper";
import useSWR from "swr";
import _ from "lodash";
import Fireplace from "components/canvas/Fireplace";
import { getSession } from "next-auth/react";
import ButtlerAnt from 'components/ButtlerAnt';
import GiftBox from 'components/GiftBox';
import TutorialButton from 'components/TutorialButton';

type Props = {
  userName: string;
};

export default function Index(props: Props) {
  const {  userName } = props;

  const { data: users } = useSWR(`/api/user-list`, fetcher);
  const userInfo = useMemo(() => _.find(users, { 'name': userName }), [users, userName]);

  const [needTutorial, setNeedTutorial] = useState(false);
  const setDoneTutorial = useCallback(() => {
    setNeedTutorial(false);
  }, []);

  const [ticket, setTicket] = useState(0);
  useEffect(() => {
      if (userInfo) {
        setNeedTutorial(!!userInfo?.userId);
        setTicket(userInfo?.ticket ?? 0);
      }
  }, [userInfo]);

  return (
    <div className="relative overflow-hidden">
      <div className="fixed top-5 left-5">
        <audio id="bgm" loop controls>
          <source src="sounds/jingle_bells.mp3" />
        </audio>
      </div>
      <ButtlerAnt />
      <Fireplace />
      {!needTutorial && <GiftBox ticket={ticket} setTicket={(n: number) => setTicket(n)} />}
      <TutorialButton setDoneTutorial={setDoneTutorial} needTutorial={needTutorial} />
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

  const { user } = session;
  const { name } = user;

  return {
    props: { userName: user?.name },
  };
};
