'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import getUser from '@/actions/getUser';
import LoadingScreen from '@/components/LoadingScreen';

export const UserProvider = createContext(undefined);

export default function AuthHandler({ children }) {
    const [user, setUser] = useState(null);
    const { push } = useRouter();

    useEffect(() => {
        const sessionToken = window.localStorage.getItem('session');

        if (sessionToken && sessionToken.length > 0) {
            (async () => {
                try {
                    const result = await getUser('@me', sessionToken);

                    if (result.success) {
                        setUser(result.data);

                        if (result.data === null) {
                            push('/auth/login');
                        } else if (!children) {
                            push('/');
                        }
                    } else {
                        setUser(null);

                        push('/auth/login');
                    }
                } catch {
                    setUser(null);

                    push('/auth/login');
                }
            })();
        } else {
            push('/auth/login');
        }
    }, []);

    return (
        children && user
            ? <UserProvider.Provider value={user}>
                {children}
            </UserProvider.Provider>
            : <LoadingScreen />
    );
}