import Link from 'next/link';
import CornerDownLeftIcon from '@/assets/icons/corner-down-left.svg';
import NewTokenForm from '@/components/dashboard/applications/tokens/NewTokenForm';

export const metadata = {
    title: 'New Token'
};

export default function Page({ params: { id } }) {
    return (
        <>
            <h1 className="text-5xl font-bold">New API Token</h1>
            <p className="mt-1 text-xl text-neutral-400">Create a new API token by filling out this form.</p>
            <Link href={`/applications/${id}/tokens`} className="flex items-center gap-2 mt-8 button w-fit">
                <CornerDownLeftIcon width="16" height="16" />
                <span>Back to Tokens List</span>
            </Link>
            <NewTokenForm applicationID={id} className="mt-3" />
        </>
    );
}