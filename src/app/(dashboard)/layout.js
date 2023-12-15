import AuthHandler from '@/components/auth/AuthHandler';

export const viewport = {
    themeColor: '#0a0a0a'
};

export default function Layout({ children }) {
    return (
        <AuthHandler>
            {children}
        </AuthHandler>
    );
}