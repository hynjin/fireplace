import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";
import { fetcher, postFetcher } from "../helper/Helper";
import { useSession } from "next-auth/react";
import { PRESENT_TYPE } from "types/constants";
import RecieverList from "./RecieverList";

type Props = {
  setMove?: (t: boolean) => void;
  userList?: string[];
};

type SendLetterType = {
  sender: string;
  reciever: string;
  content?: string;
  present?: string[];
  anonymous: boolean;
};

export default function SendLetterForm(props: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const userName = user?.name;

  const { userList } = props;

  const sender = userName;
  const [reciever, setReciever] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setAnonymous] = useState(false);
  const [present, setPresent] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);

  const onClickSendLetter = useCallback(async (data: SendLetterType) => {
    if (data?.reciever) {
      await postFetcher("/api/letters", data);
      location.reload(); //for letter list update
    } else {
      setIsError(true);
    }
  }, []);

  const handleChangeSelectTo = useCallback((e) => {
    setReciever(e.target.value);
    setIsError(false);
  }, []);

  const handleChangeAnonymous = useCallback((e) => {
    setAnonymous(e.target.checked);
  }, []);

  const handleChangeSelectPresent = useCallback((e) => {
    const selectPresent = e.target.value;
    if (e.target.checked) {
      setPresent((prev) => prev.concat(selectPresent));
    } else {
      setPresent((prev) => prev.filter((p) => p !== selectPresent));
    }
  }, []);

  useEffect(() => console.log("+++ pre", present), [present]);

  return (
    <form className="">
      <div>
        <h6 className="mb-2">From. {isAnonymous ? "익명" : user?.name}</h6>
        <div className="flex items-center mb-4">
          <h6 className="mr-1">익명으로 보내기</h6>
          <input type="checkbox" onChange={handleChangeAnonymous} />
        </div>
      </div>
      <h6 className="mb-1">To. </h6>
      <RecieverList userList={userList} setReciever={setReciever} />
      {isError && (
        <div className="text-red-600">
          <h6>받는 이를 선택해야합니다.</h6>
        </div>
      )}
      <div className="p-4">
        <h6 className="text-gray-800 mb-4">함께 보낼 선물을 골라주세요.</h6>
        {_.map(PRESENT_TYPE, (PRESENT) => (
          <div className="py-1" key={`creat-reciever-${PRESENT}`}>
            <input
              type="checkbox"
              id={`creat-reciever-${PRESENT}`}
              value={PRESENT}
              onChange={handleChangeSelectPresent}
              className="mr-2"
            />
            <label htmlFor={`creat-reciever-${PRESENT}`}>{PRESENT}</label>
          </div>
        ))}
      </div>
      <textarea
        className="border border-red-700 p-3 h-40"
        placeholder="올 한 해 함께한 동료에게"
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
