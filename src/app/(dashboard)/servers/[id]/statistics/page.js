import PlayerCountChart from '@/components/dashboard/servers/statistics/PlayerCountChart';
import UptimeChart from '@/components/dashboard/servers/statistics/UptimeChart';

export const metadata = {
    title: 'Statistics'
};

export default function Page({ params: { id } }) {
    return (
        <>
            <h1 className="text-5xl font-bold">Statistics</h1>
            <p className="mt-1 text-xl text-neutral-400">An overview the server statistics and uptime.</p>
            <h2 className="mt-8 text-2xl font-semibold">Uptime</h2>
            <p className="text-neutral-400">Last 30 days</p>
            <UptimeChart serverID={id} className="mt-3" />
            <h2 className="mt-8 text-2xl font-semibold">Player Count</h2>
            <p className="text-neutral-400">Last 24 hours</p>
            <PlayerCountChart serverID={id} className="mt-3" />
            <p className="py-12 text-sm text-center text-neutral-600">More statistics to be added in the future.</p>
        </>
    );
}