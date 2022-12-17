import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";

type Props = {
  letters: LetterType[];
};

export default function LetterList(props: Props) {
  const { letters } = props;

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
