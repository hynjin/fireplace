declare type LetterType = {
    _id: string;
    from: string;
    to: string;
    content: string;
    anonymous: boolean;
    present: import('src/types/constants').PresentTypeUnion;
};
