'use server';

export default async function postDiscordCallback(code) {
    const result = await fetch(`${process.env.API_HOST}/auth/discord?code=${code}`, {
        method: 'POST'
    });

    if (result.status !== 200) {
        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}