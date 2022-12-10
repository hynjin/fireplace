export const PRESENT_TYPE = { //그냥 배열이면 안되나
  MONEY: '금전',
  SKILL: '기술',
  LOVE: '사랑',
  HONOR: '명예',
  POWER: '권력',
  HEALTH: '건강',
  HOUSE: '부동산',
  HUMAN: '인간관계',
};

export type PresentTypeUnion = ValueOf<typeof PRESENT_TYPE>;
