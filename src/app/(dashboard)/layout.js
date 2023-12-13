import AuthHandler from '@/components/AuthHandler';

export default function Layout({ children }) {
    return (
        <AuthHandler>
            {children}
        </AuthHandler>
    );
}