export const metadata = {
    title: 'Revisions'
};

export default function Page() {
    return (
        <>
            <h1 className="text-5xl font-bold">Revisions</h1>
            <p className="mt-1 text-xl text-neutral-400">Documentation about the revisions the API has undergone.</p>
            <h2 className="mt-8 text-2xl font-semibold">Overview</h2>
            <p className="mt-3 leading-7 text-neutral-400">This API has undergone several changes during the past few years, of which there has been breaking changes that are not compatible with existing users of the API who rely on data types and overall response structure to be consistent. This is why we release new API revisions under different base paths of the API to allow existing users to migrate when they are ready.</p>
            <p className="mt-3 leading-7 text-neutral-400">All changes to the API have been implemented with the goal of improving the user experience, or improving the reliability and stability of our service to all. While not all revisions are as easy to migrate between, we try to provide the best documentation available to make this transition as seamless as possible.</p>
            <p className="mt-3 leading-7 text-neutral-400">If you are experiencing issues or just need some extra support with the migration or anything else with our API, feel free to join our small <a href="https://discord.gg/QwvzbA9KGz" target="_blank" rel="noreferrer" className="link">Discord server</a>. We can provide better instantaneous support there instead of over email.</p>
        </>
    );
}