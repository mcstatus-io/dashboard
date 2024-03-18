import TokensList from '@/components/dashboard/applications/tokens/TokensList';

export const metadata = {
    title: 'Tokens'
};

export default function Page({ params: { id } }) {
    return (
        <>
            <h1 className="text-5xl font-bold">API Tokens</h1>
            <p className="mt-1 text-xl text-neutral-400">A list of API tokens generated for your application.</p>
            <TokensList applicationID={id} className="mt-8" />
        </>
    );
}