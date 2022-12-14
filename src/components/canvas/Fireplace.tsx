import React, { useMemo } from "react";
import _ from "lodash";
import Bonfire from "./Bonfire";
import { fetcher, postFetcher, getPresentInfo } from "helper/Helper";
import { useSession } from "next-auth/react";
import useSWR from "swr";

type Props = {};

export default function Fireplace(props: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name;
  const userId = user?.userId;

  const { data: letters } = useSWR(
    `/api/letters?name=${userName}&isRead=false&userId=${userId}`,
    fetcher
  );
  const letterCount = useMemo(() => letters?.length, [letters]);

  return (
    <div className="">
      <div className="absolute bottom-40 left-[50%] translate-x-[-50%] w-1/3 h-fit">
        <img src="/images/fireplace.png" alt="" className="" />
      </div>
        <Bonfire />
      <div className="absolute top-12 left-[50%] translate-x-[-50%]">
        <div className="flex flex-col py-4 px-9 top-0 border-4 border-dashed border-green-600 rounded bg-red-700 z-10">
          <h3 className="text-white text-center mb-4">{userName}의 벽난로</h3>
          <h4 className="text-white text-center">
            {letterCount}개의 선물을 받았어요❤️
          </h4>
        </div>
      </div>
    </div>
  );
}
