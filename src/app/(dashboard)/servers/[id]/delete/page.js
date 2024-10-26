import getServer from '@/actions/getServer';
import DeleteServerForm from '@/components/dashboard/servers/delete/DeleteServerForm';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Delete Server'
};

export default async function Page({ params: { id } }) {
    const result = await getServer(id);
    if (!result.success || !result.data) return notFound();

    return (
        <>
            <h1 className="text-5xl font-bold">Delete Server</h1>
            <p className="mt-1 text-xl text-neutral-400">Permanently delete your created server.</p>
            <DeleteServerForm server={result.data} className="mt-8" />
        </>
    );
}