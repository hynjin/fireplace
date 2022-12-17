import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useMemo,
} from 'react';
import _ from 'lodash';

type Props = {
    letters: LetterType[];
};

export default function LetterList(props: Props) {
    const { letters } = props;

    return (
        <div className="divide-y overflow-y">
            {_.map(letters, (letter, index) => {
                return (
                    <div key={`letter-list-${index}`}>
                        <div>From {letter.anonymous ? '익명'  : letter.sender}</div>
                        <div>To {letter.reciever}</div>
                        {letter.present && <div>+ 선물 {letter.present}</div>}
                        <div>{letter.content}</div>
                        <div>{letter.updated_at}</div>
                    </div>
                )
            })}
        </div>
    );
}
