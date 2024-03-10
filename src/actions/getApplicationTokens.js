'use server';

export default async function getApplicationTokens(id, sort = 'name', direction = 'ascending', sessionToken) {
    const params = new URLSearchParams();
    params.set('sort', sort);
    params.set('direction', direction);

    const result = await fetch(`${process.env.API_HOST}/applications/${id}/tokens?${params.toString()}`, {
        method: 'GET',
        headers: { Authorization: sessionToken },
        cache: 'no-cache'
    });

    if (result.status !== 200) {
        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}