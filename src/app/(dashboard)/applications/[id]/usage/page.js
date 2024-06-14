import UsageChart from '@/components/dashboard/applications/usage/UsageChart';

export const metadata = {
    title: 'Usage'
};

export default function Page({ params: { id } }) {
    return (
        <>
            <h1 className="text-5xl font-bold">Usage</h1>
            <p className="mt-1 text-xl text-neutral-400">An overview of how your application is interacting with the API.</p>
            <h2 className="mt-8 text-2xl font-semibold">Total Requests</h2>
            <p className="text-neutral-400">Last 24 hours</p>
            <UsageChart applicationID={id} className="mt-3" />
            <p className="text-sm text-neutral-600 py-12 text-center">More analytics to be added in the future.</p>
        </>
    );
}