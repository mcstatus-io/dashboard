'use client';

import humanizeDuration from 'humanize-duration';
import Link from 'next/link';
import getUserApplications from '@/actions/getUserApplications';
import LoadingIcon from '@/assets/icons/loading.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import { useQuery } from '@tanstack/react-query';
import DropdownSelect from '@/components/DropdownSelect';
import { useState } from 'react';

export default function ApplicationsList({ className = '' }) {
    const [sortingKey, setSortingKey] = useState('name');
    const [sortingDirection, setSortingDirection] = useState('ascending');

    const { isPending, error, data } = useQuery({
        queryKey: ['applications', { sortingKey, sortingDirection }],
        queryFn: () => getUserApplications('@me', sortingKey, sortingDirection, window.localStorage.getItem('session'))
    });

    return (
        <div className={`box flex flex-col gap-3 ${className}`}>
            <div className="flex items-center gap-3">
                {
                    data?.data?.length < 3
                        ? <Link href="/applications/new" className="flex items-center gap-2 button">
                            <PlusIcon width="16" height="16" />
                            <span>New Application</span>
                        </Link>
                        : <button type="button" className="flex items-center gap-2 button" disabled>
                            <PlusIcon width="16" height="16" />
                            <span>New Application</span>
                        </button>
                }
                <DropdownSelect
                    title="Sort By: "
                    appendSelection
                    options={[
                        { key: 'name', text: 'Name' },
                        { key: 'createdAt', text: 'Created At' }
                    ]}
                    selected={sortingKey}
                    onChange={(key) => setSortingKey(key)}
                    disabled={isPending || error || !data.success || data?.data?.length < 2} />
                <DropdownSelect
                    title="Sort Direction: "
                    appendSelection
                    options={[
                        { key: 'ascending', text: 'Ascending' },
                        { key: 'descending', text: 'Descending' }
                    ]}
                    selected={sortingDirection}
                    onChange={(direction) => setSortingDirection(direction)}
                    disabled={isPending || error || !data.success || data?.data?.length < 2} />
            </div>
            {
                data?.data?.length >= 3
                    ? <p className="text-orange-400">No more applications can be created as you have reached the limit.</p>
                    : null
            }
            {
                isPending
                    ? <div className="flex items-center justify-center py-24 box">
                        <LoadingIcon width="48" height="48" />
                    </div>
                    : error || !data.success
                        ? <div className="text-red-400">There was an error while fetching the list of applications. Please try again later.</div>
                        : data.data.length > 0
                            ? <ul className="flex flex-col gap-3">
                                {
                                    data.data.map((application, index) => (
                                        <li key={index}>
                                            <Link href={`/applications/${application.id}`}>
                                                <div className="box box-interactive">
                                                    <p className="text-2xl font-bold">{application.name}</p>
                                                    <p className="mt-1 text-neutral-300">{application.shortDescription}</p>
                                                    <p className="mt-2 text-sm text-neutral-500">Created {humanizeDuration(Date.now() - new Date(application.createdAt).getTime(), { largest: 1, round: true })} ago</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            : <p className="mt-2 text-neutral-400">There does not seem to be any applications here. Why not create one?</p>
            }
        </div>
    );
}