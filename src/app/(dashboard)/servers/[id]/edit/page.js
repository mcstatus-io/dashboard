import { notFound } from 'next/navigation';
import getServer from '@/actions/getServer';
import EditServerForm from '@/components/dashboard/servers/edit/EditServerForm';

export const metadata = {
    title: 'Edit Details'
};

export default async function Page({ params: { id } }) {
    const result = await getServer(id);
    if (!result.success || !result.data) return notFound();

    return (
        <>
            <h1 className="text-5xl font-bold">Edit Details</h1>
            <p className="mt-1 text-xl text-neutral-400">Change the details of your server.</p>
            <EditServerForm server={result.data} className="mt-8" />
        </>
    );
}