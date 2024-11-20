'use server';

export default async function getServerStatusLogs(id, sort = 'timestamp', direction = 'descending', page = 1, count = 10, sessionToken) {
    const params = new URLSearchParams();
    params.set('sort', sort);
    params.set('direction', direction);
    params.set('page', page);
    params.set('count', count);

    const result = await fetch(`${process.env.API_HOST}/servers/${id}/statistics/logs?${params.toString()}`, {
        method: 'GET',
        headers: { Authorization: sessionToken },
        cache: 'no-cache'
    });

    return result.status === 200
        ? { success: true, data: await result.json() }
        : { success: false, message: await result.text() };
}