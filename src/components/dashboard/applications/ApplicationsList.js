'use client';

import humanizeDuration from 'humanize-duration';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import getUserApplications from '@/actions/getUserApplications';
import LoadingIcon from '@/assets/icons/loading.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import RefreshClockwiseIcon from '@/assets/icons/refresh-cw.svg';
import useDataReducer from '@/hooks/useDataReducer';

export default function ApplicationsList({ className = '' }) {
    const { data, dispatch } = useDataReducer();
    const [reloadID, setReloadID] = useState(0);

    useEffect(() => {
        dispatch({ type: 'RESET' });

        (async () => {
            try {
                const result = await getUserApplications('@me', window.localStorage.getItem('session'));

                dispatch({ type: 'SET_DATA', data: result });
            } catch (e) {
                dispatch({ type: 'SET_ERROR', error: e.message });
            }
        })();
    }, [reloadID]);

    return (
        <div className={className}>
            {
                data.isLoaded
                    ? data.error
                        ? <div className="border border-neutral-800 rounded p-5 text-red-400">{data.error}</div>
                        : <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Link href="/applications/new" className="button flex items-center gap-2">
                                    <PlusIcon width="16" height="16" />
                                    <span>New Application</span>
                                </Link>
                                <button type="button" className="button flex items-center gap-2" onClick={() => setReloadID((reloadID + 1) % 10)}>
                                    <RefreshClockwiseIcon width="16" height="16" />
                                    <span>Reload Data</span>
                                </button>
                            </div>
                            {
                                data.data.length > 0
                                    ? <ul className="flex flex-col gap-3">
                                        {
                                            data.data.map((application, index) => (
                                                <li key={index}>
                                                    <Link href={`/applications/${application.id}`}>
                                                        <div className="border border-neutral-800 hover:border-white p-5 rounded cursor-pointer">
                                                            <p className="text-2xl font-bold">{application.name}</p>
                                                            <p className="text-neutral-300 mt-1">{application.shortDescription}</p>
                                                            <p className="text-neutral-500 mt-2 text-sm">Created {humanizeDuration(Date.now() - new Date(application.createdAt).getTime(), { largest: 1, round: true })} ago</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
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