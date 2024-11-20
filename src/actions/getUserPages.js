'use server';

export default async function getUserPages(id = '@me', sort = 'name', direction = 'ascending', sessionToken = null) {
    const params = new URLSearchParams();
    params.set('sort', sort);
    params.set('direction', direction);

    const result = await fetch(`${process.env.API_HOST}/users/${id}/pages?${params.toString()}`, {
        method: 'GET',
        headers: sessionToken ? { Authorization: sessionToken } : undefined,
        cache: 'no-store'
    });

    return result.status === 200
        ? { success: true, data: await result.json() }
        : { success: false, message: await result.text() };
}