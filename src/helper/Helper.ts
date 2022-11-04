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
