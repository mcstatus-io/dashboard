import TokensList from '@/components/dashboard/applications/tokens/TokensList';

export const metadata = {
    title: 'Tokens'
};

export default function Page({ params: { id } }) {
    return (
        <>
            <h1 className="text-5xl font-bold">API Tokens</h1>
            <p className="mt-1 text-xl text-neutral-400">A list of API tokens generated for your application.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <TokensList applicationID={id} />
        </>
    );
}