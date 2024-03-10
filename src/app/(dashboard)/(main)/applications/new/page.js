import Link from 'next/link';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import NewApplicationForm from '@/components/dashboard/applications/NewApplicationForm';

export const metadata = {
    title: 'New Application'
};

export default function Page() {
    return (
        <div>
            <Link href="/applications">
                <span className="flex items-center gap-2 text-lg link">
                    <ArrowLeftIcon width="20" height="20" />
                    <span>Back to Applications</span>
                </span>
            </Link>
            <h1 className="mt-5 text-5xl font-bold">New Application</h1>
            <p className="mt-1 text-xl text-neutral-400">Create a new application by filling out this form.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <NewApplicationForm />
        </div>
    );
}