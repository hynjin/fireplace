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
import RecieverList from './RecieverList';

type Props = {
    setMove?: (t: boolean) => void;
    userList?: string[];
};

type SendLetterType = {
    from: string;
    to: string;
    content?: string;
    present?: string[];
    anonymous: boolean;
}

export default function SendLetterForm(props: Props) {
    const { data: session } = useSession();
    const user = session?.user;
    const userName = '히히'; // user.userName 사용

    const { userList } = props;

    const from = user?.name;
    const [to, setTo] = useState('');
    const [content, setContent] = useState('');
    const [isAnonymous, setAnonymous] = useState(false);
    const [present, setPresent] = useState<string[]>([]);
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
        const selectPresent = e.target.value;
        if (e.target.checked) {
            setPresent(prev => prev.concat(selectPresent));
        } else {
            setPresent(prev => prev.filter(p => p !== selectPresent));
        }
    }, []);

    useEffect(() => console.log('+++ pre', present), [present]);

    return (
        <form className="py-3">
            <div>
                From {isAnonymous ? '익명' : user?.name}
                <div>익명으로 보내기 <input type="checkbox" onChange={handleChangeAnonymous} /></div>
            </div>
            <RecieverList userList={userList} />
            {isError && <div className='text-red-600'>받는 이를 선택해야합니다.</div>}
            <div>
                + 선물
                    {_.map(PRESENT_TYPE, PRESENT => (
                        <div key={`creat-to-${PRESENT}`} >
                            <input type="checkbox" id={`creat-to-${PRESENT}`} value={PRESENT} onChange={handleChangeSelectPresent} />
                            <label htmlFor={`creat-to-${PRESENT}`} >{PRESENT}</label>
                        </div>
                    ))}
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
