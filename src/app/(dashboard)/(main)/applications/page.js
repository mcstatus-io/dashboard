import ApplicationsList from '@/components/dashboard/applications/ApplicationsList';

export const metadata = {
    title: 'Applications'
};

export default function Page() {
    return (
        <>
            <h1 className="text-5xl font-bold">Applications</h1>
            <p className="mt-1 text-xl text-neutral-400">A list of all your applications that interact with the API.</p>
            <ApplicationsList className="mt-8" />
        </>
    );
}