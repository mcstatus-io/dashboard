import Sidebar from '@/components/dashboard/servers/Sidebar';
import Header from '@/components/layout/Header';
import MaintenanceScreen from '@/components/MaintenanceScreen';

export default function Layout({ children }) {
    if (process.env.NEXT_PUBLIC_SHOW_MAINTENANCE === 'true') return (
        <MaintenanceScreen />
    );

    return (
        <div className="flex w-full h-screen max-h-screen">
            <Sidebar />
            <div className="grow">
                <Header />
                <div className="max-h-screen overflow-x-hidden overflow-y-auto">
                    <div className="container max-w-6xl px-24 mx-auto my-24">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}