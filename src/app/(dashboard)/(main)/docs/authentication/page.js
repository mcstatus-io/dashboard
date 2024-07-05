export const metadata = {
    title: 'Authentication'
};

export default function Page() {
    return (
        <>
            <h1 className="text-5xl font-bold">Authentication</h1>
            <p className="mt-1 text-xl text-neutral-400">Documentation about how to authenticate with the API.</p>
            <section className="my-12">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="mt-3 leading-7 text-neutral-400">Since the release of revision 3 of the API, almost all routes require authentication using a generated API token. This requirement was put into place to prevent abuse and spam, and give developers the ability to monitor how their application is interacting with our API.</p>
                <p className="mt-3 leading-7 text-neutral-400">To provide authentication during requests, simply set your API token as the value of the <code>Authorization</code> header. If this header is missing from your request, you will receive a <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401" target="_blank" rel="noreferrer" className="link">401 Unauthorized</a> response, and your request will fail.</p>
            </section>
        </>
    );
}