'use server';

export default async function postSignup(values) {
    const result = await fetch(`${process.env.API_HOST}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });

    if (result.status !== 201) {
        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}