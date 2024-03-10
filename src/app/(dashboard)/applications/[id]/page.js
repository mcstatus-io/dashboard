import { notFound } from 'next/navigation';
import getApplication from '@/actions/getApplication';
import Link from 'next/link';
import EditIcon from '@/assets/icons/edit.svg';
import TrendingUpIcon from '@/assets/icons/trending-up.svg';
import KeyIcon from '@/assets/icons/key.svg';

export const metadata = {
    title: 'Overview'
};

export default async function Page({ params: { id } }) {
    const application = await getApplication(id);
    if (!application) return notFound();

    return (
        <div>
            <h1 className="text-5xl font-bold">Overview</h1>
            <p className="mt-1 text-xl text-neutral-400">A list of quick actions you can take on this application.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <div className="flex flex-col gap-3 list-none">
                <Link href={`/applications/${id}/edit`}>
                    <div className="flex items-center gap-5 box box-interactive">
                        <div className="p-3 text-white rounded-full bg-neutral-800">
                            <EditIcon width="20" height="20" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">Edit Details</p>
                            <p>Change the details of your application.</p>
                        </div>
                    </div>
                </Link>
                <Link href={`/applications/${id}/usage`}>
                    <div className="flex items-center gap-5 box box-interactive">
                        <div className="p-3 text-white rounded-full bg-neutral-800">
                            <TrendingUpIcon width="20" height="20" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">Usage</p>
                            <p>An overview of how your application is interacting with the API.</p>
                        </div>
                    </div>
                </Link>
                <Link href={`/applications/${id}/tokens`}>
                    <div className="flex items-center gap-5 box box-interactive">
                        <div className="p-3 text-white rounded-full bg-neutral-800">
                            <KeyIcon width="20" height="20" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">API Tokens</p>
                            <p>A list of API tokens generated for your application.</p>
                        </div>
                    </div>
                </Link>
                <Link href={`/applications/${id}/delete`}>
                    <div className="flex items-center gap-5 box box-interactive">
                        <div className="p-3 text-white bg-red-800 rounded-full">
                            <KeyIcon width="20" height="20" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-red-500">Delete</p>
                            <p className="text-red-200">Permanently delete your created application.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}