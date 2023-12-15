import AuthHandler from '@/components/auth/AuthHandler';
import Sidebar from '@/components/layout/Sidebar';

export default function Layout({ children }) {
    return (
        <AuthHandler>
            <div className="flex w-full h-screen max-h-screen">
                <Sidebar />
                <div className="grow container max-w-6xl my-36 mx-auto">
                    {children}
                </div>
            </div>
        </AuthHandler>
    );
}