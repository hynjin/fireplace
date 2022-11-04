import request from '../libraries/request';

// export function getLetter(
//     httpRequester: any,
//     param?: { weekNumber: any },
//     pagination?: { limit: number; page: number }
// ): Promise<AxiosResponse> {
//     return httpRequester({
//         method: 'GET',
//         url: `/api/letters`,
//         params: { ...param, ...pagination },
//     });
// }

// export function addLetter(
//     httpRequester: any,
//     param?: { date: any; letters: any },
//     pagination?: { limit: number; page: number }
// ): Promise<AxiosResponse> {
//     return httpRequester({
//         method: 'POST',
//         url: `/api/letters`,
//         data: { ...param, ...pagination },
//     });
// }

export function getLetters(params: { name?: string }) {
    return request({
        url: `/letters`,
        method: 'GET',
        params,
    });
}

export function getLetterList(params: { }) {
    return request({
        url: `/letters`,
        method: 'GET',
        params,
    });
}

export function addLetter(params?: { from: string; to: string; content: string }) {
    return request({
        url: `/letters`,
        method: 'POST',
        data: params,
    });
}
