import { notFound } from 'next/navigation';
import Link from 'next/link';
import EditIcon from '@/assets/icons/edit.svg';
import KeyIcon from '@/assets/icons/key.svg';
import TrendingUpIcon from '@/assets/icons/trending-up.svg';
import ListIcon from '@/assets/icons/list.svg';
import getServer from '@/actions/getServer';

export const metadata = {
    title: 'Overview'
};

export default async function Page({ params: { id } }) {
    const result = await getServer(id);
    if (!result.success || !result.data) return notFound();

    return (
        <>
            <h1 className="text-5xl font-bold">Overview</h1>
            <p className="mt-1 text-xl text-neutral-400">A list of quick actions you can take on this server.</p>
            <div className="flex flex-col gap-3 mt-8 list-none">
                <Link href={`/servers/${id}/edit`}>
                    <div className="flex items-center gap-5 box box-interactive">
                        <div className="p-3 text-white rounded-full bg-neutral-800">
                            <EditIcon width="20" height="20" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">Edit Details</p>
                            <p>Change the details of your server.</p>
                        </div>
                    </div>
                </Link>
                <Link href={`/servers/${id}/statistics`}>
                    <div className="flex items-center gap-5 box box-interactive">
                        <div className="p-3 text-white rounded-full bg-neutral-800">
                            <TrendingUpIcon width="20" height="20" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">Statistics</p>
                            <p>An overview the server statistics and uptime.</p>
                        </div>
                    </div>
                </Link>
                <Link href={`/servers/${id}/logs`}>
                    <div className="flex items-center gap-5 box box-interactive">
                        <div className="p-3 text-white rounded-full bg-neutral-800">
                            <ListIcon width="20" height="20" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">Status Logs</p>
                            <p>A list of recent status changes of the server.</p>
                        </div>
                    </div>
                </Link>
                <Link href={`/servers/${id}/delete`}>
                    <div className="flex items-center gap-5 border-red-500/50 hover:border-red-500 box box-interactive bg-red-400/10 hover:bg-red-400/15">
                        <div className="p-3 text-white rounded-full bg-neutral-800">
                            <KeyIcon width="20" height="20" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">Delete</p>
                            <p>Permanently delete your created server.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}