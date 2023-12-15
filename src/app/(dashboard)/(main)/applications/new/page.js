import Link from 'next/link';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import NewApplicationForm from '@/components/dashboard/applications/NewApplicationForm';

export const metadata = {
    title: 'New Application'
};

export default function Page() {
    return (
        <div className="container mx-auto max-w-3xl">
            <Link href="/applications">
                <span className="link flex items-center gap-2 text-lg">
                    <ArrowLeftIcon width="20" height="20" />
                    <span>Back to applications</span>
                </span>
            </Link>
            <h1 className="font-bold text-5xl mt-5">New Application</h1>
            <p className="text-xl text-neutral-400 mt-1">Create a new application by filling out this form.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <NewApplicationForm />
        </div>
    );
}