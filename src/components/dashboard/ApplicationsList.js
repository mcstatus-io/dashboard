'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import getUserApplications from '@/actions/getUserApplications';
import LoadingIcon from '@/assets/icons/loading.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import useDataReducer from '@/hooks/useDataReducer';

export default function ApplicationsList({ className = '' }) {
    const { data, dispatch } = useDataReducer();

    useEffect(() => {
        (async () => {
            try {
                const result = await getUserApplications('@me', window.localStorage.getItem('session'));

                dispatch({ type: 'SET_DATA', data: result });
            } catch (e) {
                dispatch({ type: 'SET_ERROR', error: e.message });
            }
        })();
    }, []);

    return (
        <div className={className}>
            {
                data.isLoaded
                    ? data.error
                        ? <div className="border border-neutral-800 rounded p-5 text-red-400">{data.error}</div>
                        : <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Link href="/applications/new">
                                    <div className="button flex items-center gap-2">
                                        <PlusIcon width="16" height="16" />
                                        <span>New Application</span>
                                    </div>
                                </Link>
                            </div>
                            {
                                data.length > 0
                                    ? null
                                    : <p className="text-neutral-400 mt-5">There does not seem to be any applications here. Why not create one?</p>
                            }
                        </div>
                    : <div className="flex items-center justify-center border border-neutral-800 rounded py-24">
                        <LoadingIcon width="48" height="48" />
                    </div>
            }
        </div>
    );
}