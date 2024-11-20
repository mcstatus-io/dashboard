'use client';

import DropdownSelect from '@/components/DropdownSelect';
import { useQuery } from '@tanstack/react-query';
import getServerStatusLogs from '@/actions/getServerStatusLogs';
import { useState } from 'react';
import dateFormat from 'dateformat';
import humanizeDuration from 'humanize-duration';
import LoadingCard from '@/components/LoadingCard';
import ErrorCard from '@/components/ErrorCard';

export default function StatusLogs({ server, className = '' }) {
    const [sortingDirection, setSortingDirection] = useState('descending');

    const { isPending, error, data } = useQuery({
        queryKey: ['servers', { sortingDirection }, 'status-logs'],
        queryFn: () => getServerStatusLogs(server.id, 'timestamp', sortingDirection, 1, 10, window.localStorage.getItem('session'))
    });

    if (isPending) return <LoadingCard className={className} />;
    if (error || !data.success) return <ErrorCard className={className} />;

    const logs = [];

    if (!isPending && !error && data.success) {
        for (let i = 0; i < data.data.length; i++) {
            const log = data.data[i];

            if (i !== 0) {
                logs.push(
                    <li key={i * 2 - 1}>
                        <p className="ml-5 font-mono text-sm text-neutral-500">... {humanizeDuration(data.data[i - 1].duration * 1000, { round: true })} ...</p>
                    </li>
                );
            }

            logs.push(
                <li key={i * 2}>
                    <p>
                        <span className="mr-3 font-mono text-neutral-400">{dateFormat(log.timestamp, 'dddd, mmmm dd, yyyy @ HH:MM:ss')}</span>
                        {
                            log.newStatus === 'unknown'
                                ? <span>Server was created</span>
                                : <>
                                    <span>Server is now </span>
                                    {
                                        log.newStatus === 'online'
                                            ? <span className="text-green-400">online</span>
                                            : <span className="text-red-400">offline</span>
                                    }
                                </>
                        }

                    </p>
                </li>
            );
        }
    }

    return (
        <div className={`box flex flex-col gap-3 ${className}`}>
            <div className="flex items-center gap-3">
                <DropdownSelect
                    title="Sort By: "
                    appendSelection
                    options={[
                        { key: 'timestamp', text: 'Timestamp' }
                    ]}
                    selected="timestamp"
                    disabled />
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
                data.data.length > 0
                    ? <ul className="flex flex-col gap-3 p-3 bg-black border border-neutral-800">
                        {logs}
                    </ul>
                    : <p className="mt-2 text-neutral-400">There does not seem to be any recent status logs here.</p>
            }
        </div>
    );
}