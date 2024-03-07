import MaintenanceScreen from '@/components/MaintenanceScreen';
import Sidebar from '@/components/layout/Sidebar';

export default function Layout({ children }) {
    if (process.env.NEXT_PUBLIC_SHOW_MAINTENANCE) return (
        <MaintenanceScreen />
    );

    return (
        <div className="flex w-full h-screen max-h-screen">
            <Sidebar />
            <div className="container max-w-6xl px-24 mx-auto my-24 grow">
                {children}
            </div>
        </div>
    );
}