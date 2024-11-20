import getServer from '@/actions/getServer';
import StatusLogs from '@/components/dashboard/servers/logs/StatusLogs';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Status Logs'
};

export default async function Page({ params: { id } }) {
    const result = await getServer(id);
    if (!result.success || !result.data) return notFound();

    return (
        <>
            <h1 className="text-5xl font-bold">Status Logs</h1>
            <p className="mt-1 text-xl text-neutral-400">A list of recent status changes of the server.</p>
            <StatusLogs server={result.data} className="mt-8" />
        </>
    );
}