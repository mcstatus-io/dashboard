import Link from 'next/link';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import NewTokenForm from '@/components/dashboard/applications/tokens/NewTokenForm';

export const metadata = {
    title: 'New Token'
};

export default function Page({ params: { id } }) {
    return (
        <div>
            <Link href={`/applications/${id}/tokens`}>
                <span className="flex items-center gap-2 text-lg link">
                    <ArrowLeftIcon width="20" height="20" />
                    <span>Back to Tokens List</span>
                </span>
            </Link>
            <h1 className="mt-5 text-5xl font-bold">New Token</h1>
            <p className="mt-1 text-xl text-neutral-400">Create a new API token by filling out this form.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <NewTokenForm applicationID={id} />
        </div>
    );
}