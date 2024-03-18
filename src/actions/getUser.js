'use server';

export default async function getUser(id, sessionToken = null) {
    const result = await fetch(`${process.env.API_HOST}/users/${id}`, {
        method: 'GET',
        headers: sessionToken ? { Authorization: sessionToken } : undefined,
        cache: 'no-store'
    });

    return result.status === 200
        ? { success: true, data: await result.json() }
        : result.status === 404
            ? { success: true, data: null }
            : { success: false, message: await result.text() };
}