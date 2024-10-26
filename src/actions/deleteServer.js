'use server';

export default async function deleteServer(serverID, sessionToken) {
    const result = await fetch(`${process.env.API_HOST}/servers/${serverID}`, {
        method: 'DELETE',
        headers: { Authorization: sessionToken }
    });

    return result.status === 200
        ? { success: true, data: await result.text() }
        : { success: false, message: await result.text() };
}