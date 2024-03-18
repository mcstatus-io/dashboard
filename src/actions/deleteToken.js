'use server';

export default async function deleteToken(applicationID, tokenID, sessionToken) {
    const result = await fetch(`${process.env.API_HOST}/applications/${applicationID}/tokens/${tokenID}`, {
        method: 'DELETE',
        headers: { Authorization: sessionToken }
    });

    return result.status === 200
        ? { success: true, data: await result.text() }
        : { success: false, message: await result.text() };
}