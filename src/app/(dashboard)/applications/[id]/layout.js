import Sidebar from '@/components/dashboard/applications/Sidebar';

export default async function Layout({ children }) {
    // TODO

    return (
        <div className="flex w-full h-screen max-h-screen">
            <Sidebar />
            <div className="grow container max-w-6xl px-24 my-24 mx-auto">
                {children}
            </div>
        </div>
    );
}