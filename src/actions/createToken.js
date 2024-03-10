'use server';

export default async function createToken(applicationID, values, sessionToken = null) {
    const result = await fetch(`${process.env.API_HOST}/applications/${applicationID}/tokens`, {
        method: 'POST',
        headers: { Authorization: sessionToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });

    if (result.status !== 201) {
        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}