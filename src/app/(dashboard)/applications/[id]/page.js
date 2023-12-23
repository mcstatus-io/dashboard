import { notFound } from 'next/navigation';
import getApplication from '@/actions/getApplication';
import EditApplicationForm from '@/components/dashboard/applications/EditApplicationForm';

export const metadata = {
    title: 'Overview'
};

export default async function Page({ params: { id } }) {
    const application = await getApplication(id);
    if (!application) return notFound();

    return (
        <div>
            <h1 className="font-bold text-5xl">Overview</h1>
            <p className="text-xl text-neutral-400 mt-1">A quick overview of your created application.</p>
            <hr className="mt-5 mb-10 border-neutral-800" />
            <EditApplicationForm application={application} />
        </div>
    );
}