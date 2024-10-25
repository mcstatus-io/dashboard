'use server';

export default async function getServer(id) {
    const result = await fetch(`${process.env.API_HOST}/servers/${id}`, {
        method: 'GET',
        cache: 'no-cache'
    });

    return result.status === 200
        ? { success: true, data: await result.json() }
        : result.status === 404
            ? { success: true, data: null }
            : { success: false, message: await result.text() };
}