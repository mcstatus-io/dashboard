import AlertTriangleIcon from '@/assets/icons/alert-triangle.svg';

export const metadata = {
    title: 'Revisions'
};

export default function Page() {
    return (
        <>
            <h1 className="text-5xl font-bold">Revisions</h1>
            <p className="mt-1 text-xl text-neutral-400">Documentation about the revisions the API has undergone.</p>
            <section className="my-12">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="mt-3 leading-7 text-neutral-400">This API has undergone several changes during the past few years, of which there has been breaking changes that are not compatible with existing users of the API who rely on data types and overall response structure to be consistent. This is why we release new API revisions under different base paths of the API to allow existing users to migrate when they are ready.</p>
                <p className="mt-3 leading-7 text-neutral-400">All changes to the API have been implemented with the goal of improving the user experience, or improving the reliability and stability of our service to all. While not all revisions are as easy to migrate between, we try to provide the best documentation available to make this transition as seamless as possible.</p>
                <p className="mt-3 leading-7 text-neutral-400">If you are experiencing issues or just need some extra support with the migration or anything else with our API, feel free to join our small <a href="https://discord.gg/QwvzbA9KGz" target="_blank" rel="noreferrer" className="link">Discord server</a>. We can provide better instantaneous support there instead of over email.</p>
            </section>
            <section className="my-12">
                <h2 className="text-2xl font-semibold">Revision List</h2>
                <p className="mt-3 leading-7 text-neutral-400">Below is a list of all revisions that has been released since the start of the API, some of which have been deprecated. It is recommended that you always use the latest revision, to receive the newest updates and features.</p>
                <table className="table w-full mt-3 border-t table-auto border-x border-neutral-800">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b border-b-neutral-800 bg-neutral-900">Name</th>
                            <th className="px-5 py-3 border-b border-b-neutral-800 bg-neutral-900">Base URL</th>
                            <th className="px-5 py-3 border-b border-b-neutral-800 bg-neutral-900">Release Date</th>
                            <th className="px-5 py-3 border-b border-b-neutral-800 bg-neutral-900">Shutdown Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="px-5 py-3 text-center border-b border-r border-neutral-800">Revision 1</th>
                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">
                                <code>
                                    <span>https://api.mcstatus.io</span>
                                    <span className="font-bold">/v1</span>
                                </code>
                            </td>
                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">November 2021</td>
                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">February 2023</td>
                        </tr>
                        <tr>
                            <th className="px-5 py-3 text-center border-b border-r border-neutral-800">Revision 2</th>
                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">
                                <code>
                                    <span>https://api.mcstatus.io</span>
                                    <span className="font-bold">/v2</span>
                                </code>
                            </td>
                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">July 2022</td>
                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">
                                <div className="flex items-center justify-center gap-2 text-orange-400">
                                    <AlertTriangleIcon width="18" height="18" />
                                    <span>July 2025</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="px-5 py-3 text-center border-b border-r border-neutral-800">Revision 3</th>
                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">
                                <code>
                                    <span>https://api.mcstatus.io</span>
                                    <span className="font-bold">/v3</span>
                                </code>
                            </td>
                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">July 2024</td>
                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800 text-neutral-500">&mdash;</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className="my-12">
                <h2 className="text-2xl font-semibold">Changes</h2>
                <section className="my-5">
                    <h3 className="text-lg font-light">Revision 1</h3>
                    <ul className="mt-1 list-disc list-inside text-neutral-400">
                        <li>Initial API release</li>
                        <li>Java and Bedrock status support</li>
                        <li>5 minute cache duration</li>
                    </ul>
                </section>
                <section className="my-5">
                    <h3 className="text-lg font-light">Revision 2</h3>
                    <ul className="mt-1 list-disc list-inside text-neutral-400">
                        <li>Moved all properties to the root of the response</li>
                        <li>Shortened cache duration to 1 minute</li>
                        <li>Added support for query with status routes</li>
                        <li>Added dynamic status widget images</li>
                        <li>Added a route for sending Votifier votes</li>
                        <li>Added a server icon route</li>
                    </ul>
                </section>
                <section className="my-5">
                    <h3 className="text-lg font-light">Revision 3</h3>
                    <ul className="mt-1 list-disc list-inside text-neutral-400">
                        <li>An API token is required for all routes except icon</li>
                        <li>Shortened cache duration to 30 seconds</li>
                        <li>Added a batch status lookup route</li>
                    </ul>
                </section>
            </section>
        </>
    );
}