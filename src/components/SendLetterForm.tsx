import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";
import { fetcher, postFetcher, getRandomNumber } from "helper/Helper";
import { useSession } from "next-auth/react";
import RecieverList from "./RecieverList";
import GiftList from "./GiftList";
import useSWR from "swr";

type Props = {
  setLetter?: (t: SendLetterType) => void;
};

export default function SendLetterForm(props: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name;

  const { setLetter } = props;

  const { data: users } = useSWR(`/api/user-list`, fetcher);
  const userList = useMemo(() => _.difference(_.map(users, 'name'), [userName]), [users, userName]);

  const sender = userName;
  const [reciever, setReciever] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setAnonymous] = useState(false);
  const [present, setPresent] = useState<string>('');
  const [isError, setIsError] = useState(false);

  const onClickSendLetter = useCallback(async (data: SendLetterType) => {
      const maxRandom = data?.present === 'honor' ? 1 : 5;
    const randomIndex = getRandomNumber(maxRandom);

    if (data?.reciever) {
        const letter = { ...data, presentIndex: randomIndex};
        
        await postFetcher("/api/letters", letter);
        setLetter(letter);
    } else {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    setIsError(false);
  }, [reciever]);

  const handleChangeAnonymous = useCallback((e) => {
    setAnonymous(e.target.checked);
  }, []);

  useEffect(() => console.log("+++ pre", present), [present]);

  return (
    <form className="min-w-[600px] w-full">
      <div className="flex w-full">
        <h6 className="mb-2 mr-4">From. {isAnonymous ? "익명" : user?.name}</h6>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            onChange={handleChangeAnonymous}
          />
          <h6 className="mr-1">익명으로 보내기</h6>
        </div>
      </div>
      <div className="flex items-center w-full my-3">
        <h6 className="mb-1 mr-3">To. </h6>
        <RecieverList
          userList={userList}
          setReciever={setReciever}
          isError={isError}
        />
      </div>
      <div className="py-4 mb-3">
        <h6 className="text-gray-800 mb-4">
          2023년, 이 사람이 가졌으면 하는 것! 함께 보낼 선물을 골라주세요.
        </h6>
        <GiftList setGift={setPresent} />
      </div>
      <textarea
        className="border border-red-700 p-3 h-40"
        placeholder="올 한 해 함께한 동료에게 따뜻한 편지를 적어보아요❤️"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="button"
        className="bg-red-700 p-4 rounded mt-4"
        onClick={() =>
          onClickSendLetter({
            sender,
            reciever,
            content,
            anonymous: isAnonymous,
            present,
          })
        }
      >
        <h6 className="text-white text-center">편지 보내기</h6>
      </button>
    </form>
  );
}
