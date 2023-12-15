'use server';

export default async function getUserApplications(id = '@me', sessionToken = null) {
    const result = await fetch(`${process.env.API_HOST}/users/${id}/applications`, {
        method: 'GET',
        headers: sessionToken ? { Authorization: sessionToken } : undefined,
        cache: 'no-store'
    });

    if (result.status !== 200) {
        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}