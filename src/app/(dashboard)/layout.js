import AuthHandler from '@/components/auth/AuthHandler';

export default function Layout({ children }) {
    return (
        <AuthHandler>
            {children}
        </AuthHandler>
    );
}