'use server';

export default async function postGitHubCallback(code) {
    const result = await fetch(`${process.env.API_HOST}/auth/github?code=${code}`, {
        method: 'POST'
    });

    return result.status === 200
        ? { success: true, data: await result.json() }
        : { success: false, message: await result.text() };
}