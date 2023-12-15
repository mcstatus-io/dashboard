import Sidebar from '@/components/layout/Sidebar';

export default function Layout({ children }) {
    return (
        <div className="flex w-full h-screen max-h-screen">
            <Sidebar />
            <div className="grow container max-w-6xl px-24 my-24 mx-auto">
                {children}
            </div>
        </div>
    );
}