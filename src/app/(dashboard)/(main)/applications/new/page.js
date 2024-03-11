import Link from 'next/link';
import CornerDownLeftIcon from '@/assets/icons/corner-down-left.svg';
import NewApplicationForm from '@/components/dashboard/applications/NewApplicationForm';

export const metadata = {
    title: 'New Application'
};

export default function Page() {
    return (
        <>
            <h1 className="text-5xl font-bold">New Application</h1>
            <p className="mt-1 text-xl text-neutral-400">Create a new application by filling out this form.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <Link href="/applications" className="flex items-center gap-2 button w-fit">
                <CornerDownLeftIcon width="16" height="16" />
                <span>Back to Applications</span>
            </Link>
            <NewApplicationForm className="mt-3" />
        </>
    );
}