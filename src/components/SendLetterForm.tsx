import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useMemo,
} from 'react';
import _ from 'lodash';
import { fetcher, postFetcher } from '../helper/Helper';
import { useSession } from 'next-auth/react';
import { PRESENT_TYPE } from 'types/constants';

type Props = {
    setMove?: (t: boolean) => void;
    userList?: string[];
};

type SendLetterType = {
    from: string;
    to: string;
    content?: string;
    present?: string;
    anonymous: boolean;
}

export default function SendLetterForm(props: Props) {
    const { data: session } = useSession();
    const user = session?.user;
    const userName = '히히'; // user.userName 사용

    const { setMove, userList } = props;

    // const [from, setFrom] = useState(userName);
    const from = userName;
    const [to, setTo] = useState('');
    const [content, setContent] = useState('');
    const [isAnonymous, setAnonymous] = useState(false);
    const [present, setPresent] = useState('');
    const [isError, setIsError] = useState(false);

    const onClickSendLetter = useCallback(
        async (data: SendLetterType) => {
            if (data?.to) {
                await postFetcher('/api/letters', data);
                location.reload(); //for letter list update
            } else {
                setIsError(true);
            }
        },
        []
    );

    const handleChangeSelectTo = useCallback((e) => {
        setTo(e.target.value);
        setIsError(false);
    }, []);

    const handleChangeAnonymous = useCallback((e) => {
        setAnonymous(e.target.checked);
    }, []);

    const handleChangeSelectPresent = useCallback((e) => {
        setPresent(e.target.value);
    }, []);

    return (
        <form className="py-3">
            <div>
                From {isAnonymous ? '익명' : userName}
                <div>익명으로 보내기 <input type="checkbox" onChange={handleChangeAnonymous} /></div>
            </div>
            <div>
                To
                <select onChange={handleChangeSelectTo} value={to}>
                    <option value="">선택</option>
                    {_.map(userList, user => (
                        <option value={user} key={`creat-to-${user}`}>
                            {user}
                        </option>
                    ))}
                </select>
            </div>
            {isError && <div className='text-red-600'>받는 이를 선택해야합니다.</div>}
            <div>
                + 선물
                <select onChange={handleChangeSelectPresent} value={present}>
                    <option value="">선택</option>
                    {_.map(PRESENT_TYPE, PRESENT => (
                        <option value={PRESENT} key={`creat-to-${PRESENT}`}>
                            {PRESENT}
                        </option>
                    ))}
                </select>
            </div>
            <textarea
                className="input"
                placeholder="letter"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button
                type="button"
                className="btn"
                onClick={() => onClickSendLetter({from, to, content, anonymous: isAnonymous, present})}
            >
                편지 보내기
            </button>
        </form>
    );
}
