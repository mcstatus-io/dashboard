'use server';

export default async function postSignup(values) {
    const result = await fetch(`${process.env.API_HOST}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });

    return result.status === 201
        ? { success: true, data: await result.json() }
        : { success: false, message: await result.text() };
}