'use server';

export default async function getUserApplications(id = '@me', sort = 'name', direction = 'ascending', sessionToken = null) {
    const params = new URLSearchParams();
    params.set('sort', sort);
    params.set('direction', direction);

    const result = await fetch(`${process.env.API_HOST}/users/${id}/applications?${params.toString()}`, {
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