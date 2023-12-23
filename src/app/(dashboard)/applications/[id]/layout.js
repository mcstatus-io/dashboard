import { Suspense } from 'react';
import Sidebar from '@/components/dashboard/applications/Sidebar';

export default function Layout({ children }) {
    return (
        <div className="flex w-full h-screen max-h-screen">
            <Sidebar />
            <div className="grow container max-w-6xl px-24 my-24 mx-auto">
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </div>
        </div>
    );
}