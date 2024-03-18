'use server';

export default async function postLogin(values) {
    const result = await fetch(`${process.env.API_HOST}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });

    return result.status === 200
        ? { success: true, data: await result.json() }
        : { success: false, message: await result.text() };
}