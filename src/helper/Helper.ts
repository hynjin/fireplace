import _ from 'lodash';
import { PRESENT_TYPE, PRESENT_COPY } from "types/constants";

export function fetcher(url: string) {
    return fetch(url).then((res) => res.json());
}

export function postFetcher(url: string, body: any) {
    const stringfy = JSON.stringify(body);

    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: stringfy,
    });
}

export function putFetcher(url: string, body: any) {
    const stringfy = JSON.stringify(body);

    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: stringfy,
    });
}

export function getCharPattern(character) {
    const startKoreanAlphabetSyllableCharCode = '가'.charCodeAt(0);
    const initialConsonantIndices = [
      'ㄱ',
      'ㄲ',
      'ㄴ',
      'ㄷ',
      'ㄸ',
      'ㄹ',
      'ㅁ',
      'ㅂ',
      'ㅃ',
      'ㅅ',
      'ㅆ',
      'ㅇ',
      'ㅈ',
      'ㅉ',
      'ㅊ',
      'ㅋ',
      'ㅌ',
      'ㅍ',
      'ㅎ',
    ];
  
    if (/[가-힣]/.test(character)) {
      const charCode = character.charCodeAt(0) - startKoreanAlphabetSyllableCharCode;
  
      const begin = Math.floor(charCode / 28) * 28 + startKoreanAlphabetSyllableCharCode;
      const end = begin + 27;
  
      const lastConsonantIndex = charCode % 28;
      if (lastConsonantIndex > 0) {
        return character;
      }
      return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }
  
    if (/[ㄱ-ㅎ]/.test(character)) {
      const initialConsonantIndex = _.findIndex(initialConsonantIndices, (consonant) => {
        return consonant == character;
      });
  
      const begin = initialConsonantIndex * 588 + startKoreanAlphabetSyllableCharCode;
      const end = begin + 587;
      return `[${character}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }
  
    if (/[a-zA-z]/.test(character)) {
      return `[${_.toLower(character)}|${_.toUpper(character)}]`;
    }
  
    return _.escapeRegExp(character);
  }

  export function getPresentInfo(present: string, presentIndex: number) {
    const presentType = PRESENT_TYPE[present];
    const presentCopy = PRESENT_COPY[presentType];

    const presentName = presentCopy?.[presentIndex];
    const imageType = presentType === 'honor' ? 'png' : 'jpeg';
    const presentImage = `/images/gift_category/${presentType + presentIndex}.${imageType}`;
    return { presentName, presentImage, presentType };
  }
