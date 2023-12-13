'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import getUser from '@/actions/getUser';
import LoadingIcon from '@/assets/icons/loading.svg';

export const UserProvider = createContext(undefined);

export default function AuthHandler({ children }) {
    const [user, setUser] = useState(null);
    const [cookies] = useCookies();
    const { push } = useRouter();

    useEffect(() => {
        if (Object.hasOwn(cookies, 'session')) {
            (async () => {
                try {
                    const result = await getUser('@me', cookies.session);

                    setUser(result);
                } catch {
                    setUser(null);
                }
            })();
        } else {
            push('/auth/login');
        }
    }, [cookies]);

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