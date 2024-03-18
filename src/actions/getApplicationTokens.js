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

    return result.status === 200
        ? { success: true, data: await result.json() }
        : { success: false, message: await result.text() };
}