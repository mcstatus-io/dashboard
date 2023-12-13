'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import LoadingIcon from '@/assets/icons/loading.svg';

export const UserProvider = createContext(undefined);

export default function DiscordAuthHandler() {
    const searchParams = useSearchParams();
    const [error, setError] = useState(null);
    const { push } = useRouter();

    useEffect(() => {
        if (searchParams.has('code')) {
            // TODO
        } else {
            setError('Missing code from query parameters');
        }
    }, [searchParams]);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {
                error
                    ? <div className="border border-neutral-800 p-5 rounded w-screen max-w-screen-sm">
                        <p className="leading-7">There was an error while attempting to authenticate with Discord, and the following error was provided for your convenience.</p>
                        <hr className="my-5 border-neutral-800" />
                        <p className="leading-7 mt-3 text-red-400">{error}</p>
                        <hr className="my-5 border-neutral-800" />
                        <Link href="/auth/login">
                            <span className="link">Back to login page</span>
                        </Link>
                    </div>
                    : <LoadingIcon width="64" height="64" />
            }
        </div>
    );
}