import PagesList from '@/components/dashboard/pages/PagesList';

export const metadata = {
    title: 'Pages'
};

export default function Page() {
    return (
        <>
            <h1 className="text-5xl font-bold">Pages</h1>
            <p className="mt-1 text-xl text-neutral-400">A list of status pages that you manage.</p>
            <PagesList className="mt-8" />
        </>
    );
}