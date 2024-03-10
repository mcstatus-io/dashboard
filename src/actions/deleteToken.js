'use server';

export default async function deleteToken(applicationID, tokenID, sessionToken) {
    const result = await fetch(`${process.env.API_HOST}/applications/${applicationID}/tokens/${tokenID}`, {
        method: 'DELETE',
        headers: { Authorization: sessionToken }
    });

    if (result.status !== 200) {
        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.text();

    return body;
}