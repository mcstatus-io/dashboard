'use server';

export default async function postGitHubCallback(code) {
    const result = await fetch(`${process.env.API_HOST}/auth/github?code=${code}`, {
        method: 'POST'
    });

    if (result.status !== 200) {
        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}