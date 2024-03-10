import { notFound } from 'next/navigation';
import getApplication from '@/actions/getApplication';
import EditApplicationForm from '@/components/dashboard/applications/edit/EditApplicationForm';

export const metadata = {
    title: 'Edit Details'
};

export default async function Page({ params: { id } }) {
    const application = await getApplication(id);
    if (!application) return notFound();

    return (
        <div>
            <h1 className="text-5xl font-bold">Edit Details</h1>
            <p className="mt-1 text-xl text-neutral-400">Change the details of your application.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <EditApplicationForm application={application} />
        </div>
    );
}