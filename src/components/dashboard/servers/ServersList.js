'use client';

import humanizeDuration from 'humanize-duration';
import Link from 'next/link';
import LoadingIcon from '@/assets/icons/loading.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import { useQuery } from '@tanstack/react-query';
import DropdownSelect from '@/components/DropdownSelect';
import { useState } from 'react';
import getUserServers from '@/actions/getUserServers';

export default function ServersList({ className = '' }) {
    const [sortingKey, setSortingKey] = useState('name');
    const [sortingDirection, setSortingDirection] = useState('ascending');

    const { isPending, error, data } = useQuery({
        queryKey: ['servers', { sortingKey, sortingDirection }],
        queryFn: () => getUserServers('@me', sortingKey, sortingDirection, window.localStorage.getItem('session'))
    });

    console.log(data);

    return (
        <div className={`box flex flex-col gap-3 ${className}`}>
            <div className="flex items-center gap-3">
                {
                    data?.data?.length < 3
                        ? <Link href="/servers/new" className="flex items-center gap-2 button">
                            <PlusIcon width="16" height="16" />
                            <span>New Server</span>
                        </Link>
                        : <button type="button" className="flex items-center gap-2 button" disabled>
                            <PlusIcon width="16" height="16" />
                            <span>New Server</span>
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
                    ? <p className="text-orange-400">No more servers can be created as you have reached the limit.</p>
                    : null
            }
            {
                isPending
                    ? <div className="flex items-center justify-center py-24 box">
                        <LoadingIcon width="48" height="48" />
                    </div>
                    : error || !data.success
                        ? <div className="text-red-400">There was an error while fetching the list of servers. Please try again later.</div>
                        : data.data.length > 0
                            ? <ul className="flex flex-col gap-3">
                                {
                                    data.data.map((server, index) => (
                                        <li key={index}>
                                            <Link href={`/servers/${server.id}`}>
                                                <div className="box box-interactive">
                                                    <div className="flex items-center gap-3">
                                                        {
                                                            server.server.status === 'unknown'
                                                                ? <div className="block w-2 h-2 rounded-full bg-neutral-500" title="Server status unknown" />
                                                                : server.server.status === 'online'
                                                                    ? <div className="block w-2 h-2 bg-green-400 rounded-full" title="Server online" />
                                                                    : <div className="block w-2 h-2 bg-red-400 rounded-full" title="Server offline" />
                                                        }
                                                        <p className="text-2xl font-bold">{server.name}</p>
                                                    </div>
                                                    <p className="mt-1 font-mono text-neutral-500">
                                                        <span>{server.server.hostname}</span>
                                                        {
                                                            (server.server.type === 'java' && server.server.port !== 25565) || (server.server.type === 'bedrock' && server.server.port !== 19132)
                                                                ? <span>:{server.server.port}</span>
                                                                : null
                                                        }
                                                    </p>
                                                    <p className="mt-2 text-sm text-neutral-500">Created {humanizeDuration(Date.now() - new Date(server.createdAt).getTime(), { largest: 1, round: true })} ago</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            : <p className="mt-2 text-neutral-400">There does not seem to be any servers here. Why not create one?</p>
            }
        </div>
    );
}