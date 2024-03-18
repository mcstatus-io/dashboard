'use server';

export default async function postDiscordCallback(code) {
    const result = await fetch(`${process.env.API_HOST}/auth/discord?code=${code}`, {
        method: 'POST'
    });

    return result.status === 200
        ? { success: true, data: await result.json() }
        : { success: false, message: await result.text() };
}