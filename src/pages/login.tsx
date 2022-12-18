import url from "url";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { relative } from "path";
import { useRouter } from "next/router";
import SnowFlake from "components/canvas/SnowFlake";

type SignInType = {
  error: boolean;
};
export default function SignIn(props: SignInType) {
  const { error } = props;
  const router = useRouter();
  const [snow, setSnow] = useState(false);

  useEffect(() => {
    console.log("+++ snow");
    setTimeout(() => setSnow(true), 1000);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <SnowFlake />
      <div className="absolute bottom-[-40px] left-[50%] translate-x-[-50%] z-[10] w-1/3">
        <button onClick={() => signIn("google")} className="w-fit h-fit">
          <img className="h-full w-full" src="/images/house.png" />
        </button>
      </div>
      <SnowFlake />

      <div className="h-[100vh] object-cover">
        <img
          className="h-[100vh] object-cover"
          src="/images/intro_background.png"
          style={{ backgroundSize: "cover" }}
        />
      </div>

      <div className="absolute top-[38%] left-[50%] translate-x-[-50%] flex flex-col items-center z-[100]">
        <button
          className="flex p-3 top-0 border-2 border-dashed border-green-600 rounded bg-white"
          onClick={() => signIn("google")}
        >
          <h6 className="text-md text-green-800">
            👇 집을 클릭해서 선물을 확인하러 가요! 👇
          </h6>
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
        destination: "/",
        permanent: false,
      },
    };
  }
  const { query } = url.parse(ctx.req?.url ?? "", true);
  if (query?.error === "AccessDenied") {
  }
  return {
    props: {
      error: query?.error === "AccessDenied",
    },
  };
};
