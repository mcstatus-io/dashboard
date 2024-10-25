'use server';

export default async function createServer(values, sessionToken = null) {
    const result = await fetch(`${process.env.API_HOST}/servers`, {
        method: 'POST',
        headers: { Authorization: sessionToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });

    return result.status === 201
        ? { success: true, data: await result.json() }
        : { success: false, message: await result.text() };
}