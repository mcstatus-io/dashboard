'use server';

export default async function deleteApplication(applicationID, sessionToken) {
    const result = await fetch(`${process.env.API_HOST}/applications/${applicationID}`, {
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