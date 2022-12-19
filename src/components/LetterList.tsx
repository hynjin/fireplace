import React from "react";
import _ from "lodash";
import { fetcher, getPresentInfo } from "helper/Helper";
import { getDateByFormat } from "helper/DateHelper";
import useSWR from "swr";
import { useSession } from "next-auth/react";

type Props = {
};

export default function LetterList(props: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name;
  const userId = user?.userId;

  const { data: letters } = useSWR(`/api/letters?name=${userName}&userId=${userId}`, fetcher);

  return (
    <div className="divide-y overflow-y">
      {_.isEmpty(letters) ? (
        <div className="flex flex-col gap-6">
          <div className="py-3 gap-3 border-0 border-t border-b border-gray-100">
            <h6>아직 받은 편지가 없어요!</h6>
          </div>
        </div>
      ) : (
        _.map(letters, (letter, index) => {
          const { presentName, presentImage } = getPresentInfo(letter?.present, letter?.presentIndex);

        return (
          <div className="flex flex-col gap-2" key={`letter-list-${index}`}>
            <div className="pt-4 pb-1 gap-3">
              <h6>From. {letter.anonymous ? "익명" : letter.sender}</h6>
              <div className="py-1">
                <h6>To. {letter.reciever}</h6>
              </div>
            </div>
            <div className="bg-gray-100 rounded p-6 mb-6">
              {letter.present && (
                <div className="pb-4 border-0 border-b border-gray-200">
                  <h6>함께 동봉된 선물이 있어요! [ {letter.present} {presentName} ]</h6>
                </div>
              )}
              <div className="py-4 border-0 border-b border-gray-200">
              {letter?.present && <img src={presentImage} />}
                <h6 className="mt-4" style={{whiteSpace: 'pre-wrap'}}>{letter.content}</h6>
              </div>
              <div className="pt-4">
                <h6>{getDateByFormat(letter.updated_at, 'YYYY년 M월 D일 a hh:mm:ss')}</h6>
              </div>
            </div>
          </div>
        );
      }))}
    </div>
  );
}
