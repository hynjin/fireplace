import { GetServerSideProps } from "next";
import React from "react";
import _ from "lodash";
import Bonfire from "./Bonfire";
import { useSession } from "next-auth/react";

type Props = {
  letterCount: number;
};

export default function Fireplace(props: Props) {
  const { letterCount } = props;
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name;

  return (
    <div className="fixed w-screen h-screen">
      <div className="absolute bottom-40 left-[50%] translate-x-[-50%] w-1/3 h-fit">
        <img src="/images/fireplace.png" alt="" className="" />
        <Bonfire />
      </div>
      <div className="absolute top-12 left-[50%] translate-x-[-50%]">
        <div className="flex flex-col py-4 px-9 top-0 border-4 border-dashed border-green-600 rounded bg-red-700 z-10">
          <h3 className="text-white text-center mb-4">{userName}의 벽난로</h3>
          <h3 className="text-white text-center">{letterCount}개의 선물</h3>
        </div>
      </div>
    </div>
  );
}
