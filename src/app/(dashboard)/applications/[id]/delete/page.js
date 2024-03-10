import getApplication from '@/actions/getApplication';
import DeleteApplicationForm from '@/components/dashboard/applications/delete/DeleteApplicationForm';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Delete Application'
};

export default async function Page({ params: { id } }) {
    const application = await getApplication(id);
    if (!application) return notFound();

    return (
        <div>
            <h1 className="text-5xl font-bold">Delete Application</h1>
            <p className="mt-1 text-xl text-neutral-400">Permanently delete your created application.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <DeleteApplicationForm application={application} />
        </div>
    );
}