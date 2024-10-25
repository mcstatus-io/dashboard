import Link from 'next/link';
import CornerDownLeftIcon from '@/assets/icons/corner-down-left.svg';
import NewServerForm from '@/components/dashboard/servers/NewServerForm';

export const metadata = {
    title: 'New Server'
};

export default function Page() {
    return (
        <>
            <h1 className="text-5xl font-bold">New Server</h1>
            <p className="mt-1 text-xl text-neutral-400">Create a new server by filling out this form.</p>
            <Link href="/servers" className="flex items-center gap-2 mt-8 button w-fit">
                <CornerDownLeftIcon width="16" height="16" />
                <span>Back to Servers</span>
            </Link>
            <NewServerForm className="mt-3" />
        </>
    );
}