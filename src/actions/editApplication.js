'use server';

export default async function editApplication(id, values, sessionToken = null) {
    const result = await fetch(`${process.env.API_HOST}/applications/${id}`, {
        method: 'POST',
        headers: { Authorization: sessionToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });

    return { success: result.status === 200, data: await result.text() };
}