'use server';

export default async function deleteApplication(applicationID, sessionToken) {
    const result = await fetch(`${process.env.API_HOST}/applications/${applicationID}`, {
        method: 'DELETE',
        headers: { Authorization: sessionToken }
    });

    return result.status === 200
        ? { success: true, data: await result.text() }
        : { success: false, message: await result.text() };
}