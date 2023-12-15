'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function LogoutHandler() {
    const { push } = useRouter();

    useEffect(() => {
        window.localStorage.removeItem('session');

        push('/auth/login');
    }, []);

    return (
        <LoadingScreen />
    );
}