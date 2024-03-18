'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import postGitHubCallback from '@/actions/postGitHubCallback';
import LoadingScreen from '@/components/LoadingScreen';

export const UserProvider = createContext(undefined);

export default function GitHubAuthHandler() {
    const searchParams = useSearchParams();
    const [error, setError] = useState(null);
    const { push } = useRouter();

    useEffect(() => {
        if (searchParams.has('code')) {
            (async () => {
                try {
                    const result = await postGitHubCallback(searchParams.get('code'));

                    if (result.success) {
                        window.localStorage.setItem('session', result.data.id);

                        push('/');
                    } else {
                        setError(result.message);
                    }
                } catch (e) {
                    setError(e.message);
                }
            })();
        } else {
            setError('Missing code from query parameters');
        }
    }, [searchParams]);

    return (
        error
            ? <div className="absolute w-screen max-w-screen-sm p-5 -translate-x-1/2 -translate-y-1/2 border rounded top-1/2 left-1/2 border-neutral-800">
                <p className="leading-7">There was an error while attempting to authenticate with GitHub, and the following error was provided for your convenience.</p>
                <hr className="my-5 border-neutral-800" />
                <pre className="mt-3 overflow-auto leading-7 text-red-400">{error}</pre>
                <hr className="my-5 border-neutral-800" />
                <Link href="/auth/login">
                    <span className="link">Back to login page</span>
                </Link>
            </div>
            : <LoadingScreen />
    );
}