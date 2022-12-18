import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";
import { fetcher, postFetcher, getPresentInfo } from "helper/Helper";
import useSWR from "swr";
import { useSession } from "next-auth/react";

type Props = {
  // letters: LetterType[];
};

export default function LetterList(props: Props) {
  // const { letters } = props;
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name;

  const { data: letters } = useSWR(
    `/api/letters?name=${userName}`,
    fetcher
  );

  return (
    <div className="divide-y overflow-y">
      {_.map(letters, (letter, index) => {
        return (
          <div className="gap-3" key={`letter-list-${index}`}>
            <div className="py-3">
              <h6>From {letter.anonymous ? "익명" : letter.sender}</h6>
            </div>
            <div className="py-1">
              <h6>To {letter.reciever}</h6>
            </div>
            {letter.present && <div>+ 선물 {letter.present}</div>}
            <div>
              <h6>{letter.content}</h6>
            </div>
            <div className="mb-6">
              <h6>{letter.updated_at}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}
