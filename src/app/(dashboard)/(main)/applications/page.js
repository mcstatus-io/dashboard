import ApplicationsList from '@/components/dashboard/applications/ApplicationsList';

export const metadata = {
    title: 'Applications'
};

export default function Page() {
    return (
        <div>
            <h1 className="font-bold text-5xl">Applications</h1>
            <p className="text-xl text-neutral-400 mt-1">A list of all your applications that interact with the API.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <ApplicationsList />
        </div>
    );
}