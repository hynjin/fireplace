declare type LetterType = {
    _id: string;
    sender: string;
    reciever: string;
    content: string;
    anonymous: boolean;
    present: string[];
    isRead: boolean;
    presentIndex: number;
};


declare type SendLetterType = {
    sender: string;
    reciever: string;
    content?: string;
    present?: string;
    presentIndex?: number;
    anonymous: boolean;
};