import getApplication from '@/actions/getApplication';
import DeleteApplicationForm from '@/components/dashboard/applications/delete/DeleteApplicationForm';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Delete Application'
};

export default async function Page({ params: { id } }) {
    const result = await getApplication(id);
    if (!result.success || !result.data) return notFound();

    return (
        <>
            <h1 className="text-5xl font-bold">Delete Application</h1>
            <p className="mt-1 text-xl text-neutral-400">Permanently delete your created application.</p>
            <DeleteApplicationForm application={result.data} className="mt-8" />
        </>
    );
}