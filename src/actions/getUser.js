'use server';

export default async function getUser(id, sessionToken = null) {
    const result = await fetch(`${process.env.API_HOST}/users/${id}`, {
        method: 'GET',
        headers: sessionToken ? { Authorization: sessionToken } : undefined,
        cache: 'no-store'
    });

    if (result.status !== 200) {
        if (result.status === 404) return null;

        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}