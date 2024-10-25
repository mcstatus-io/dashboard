import ServersList from '@/components/dashboard/servers/ServersList';

export const metadata = {
    title: 'Servers'
};

export default function Page() {
    return (
        <>
            <h1 className="text-5xl font-bold">Servers</h1>
            <p className="mt-1 text-xl text-neutral-400">All of the Minecraft server that you are tracking and logging.</p>
            <ServersList className="mt-8" />
        </>
    );
}