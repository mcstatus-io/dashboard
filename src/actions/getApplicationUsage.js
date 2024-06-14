'use server';

export default async function getApplicationUsage(id, sessionToken) {
    const params = new URLSearchParams();

    const result = await fetch(`${process.env.API_HOST}/applications/${id}/usage?${params.toString()}`, {
        method: 'GET',
        headers: { Authorization: sessionToken },
        cache: 'no-cache'
    });

    return result.status === 200
        ? { success: true, data: await result.json() }
        : { success: false, message: await result.text() };
}