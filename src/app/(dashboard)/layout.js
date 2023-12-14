import AuthHandler from '@/components/AuthHandler';
import Sidebar from '@/components/layout/Sidebar';

export default function Layout({ children }) {
    return (
        <AuthHandler>
            <div className="flex w-full h-screen max-h-screen">
                <Sidebar />
                <div className="grow">
                    {children}
                </div>
            </div>
        </AuthHandler>
    );
}