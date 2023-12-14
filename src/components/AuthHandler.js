'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import getUser from '@/actions/getUser';
import LoadingIcon from '@/assets/icons/loading.svg';

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

                    setUser(result);

                    if (result === null) {
                        push('/auth/login');
                    } else {
                        push('/dashboard');
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
            : <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LoadingIcon width="64" height="64" />
            </div>
    );
}