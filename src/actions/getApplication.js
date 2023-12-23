'use server';

export default async function getApplication(id) {
    const result = await fetch(`${process.env.API_HOST}/applications/${id}`, {
        method: 'GET',
        next: { revalidate: 5 }
    });

    if (result.status !== 200) {
        if (result.status === 404) return null;

        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}