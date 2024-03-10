'use client';

import AuthHandler from '@/components/auth/AuthHandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const viewport = {
    themeColor: '#0a0a0a'
};

export default function Layout({ children }) {
    return (
        <AuthHandler>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthHandler>
    );
}