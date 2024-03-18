'use client';

import Link from 'next/link';
import { useState } from 'react';
import LoadingIcon from '@/assets/icons/loading.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import getApplicationTokens from '@/actions/getApplicationTokens';
import humanizeDuration from 'humanize-duration';
import DropdownSelect from '@/components/DropdownSelect';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import deleteToken from '@/actions/deleteToken';

export default function TokensList({ applicationID, className = '' }) {
    const [sortingKey, setSortingKey] = useState('name');
    const [sortingDirection, setSortingDirection] = useState('ascending');
    const queryClient = useQueryClient();

    const { isPending, error, data } = useQuery({
        queryKey: ['application', applicationID, 'tokens', { sortingKey, sortingDirection }],
        queryFn: () => getApplicationTokens(applicationID, sortingKey, sortingDirection, window.localStorage.getItem('session'))
    });

    const handleDeleteClick = async (token) => {
        if (!confirm(`Are you sure that you want to delete the token '${token.name}'? This action cannot be undone!`)) return;

        try {
            const result = await deleteToken(applicationID, token.id, window.localStorage.getItem('session'));

            if (!result.success) {
                console.error(result.data);

                alert('Failed to delete the specified token, please check the console for more information.');

                throw new Error(result.data);
            }
        } catch (e) {
            console.error(e);

            alert('Failed to delete the specified token, please check the console for more information.');

            throw e;
        }
    };

    const mutation = useMutation({
        mutationFn: handleDeleteClick,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['application', applicationID, 'tokens'] });
        }
    });

    return (
        <div className={`box ${className}`}>
            {
                error || !data.success
                    ? <p className="text-red-400">There was an error while fetching the list of tokens. Please try again later.</p>
                    : <>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Link href={`/applications/${applicationID}/tokens/new`} className="flex items-center gap-2 button">
                                    <PlusIcon width="16" height="16" />
                                    <span>New Token</span>
                                </Link>
                                <DropdownSelect
                                    title="Sort By: "
                                    appendSelection
                                    options={[
                                        { key: 'name', text: 'Name' },
                                        { key: 'createdAt', text: 'Created At' },
                                        { key: 'lastUsedAt', text: 'Last Used At' },
                                        { key: 'totalRequests', text: 'Total Requests' }
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
                                isPending
                                    ? <div className="flex items-center justify-center py-24">
                                        <LoadingIcon width="48" height="48" />
                                    </div>
                                    : data.data.length > 0
                                        ? <table className="table border-t table-auto border-x border-neutral-800">
                                            <thead>
                                                <tr>
                                                    <th className="px-5 py-3 border-b border-b-neutral-800 bg-neutral-900">Name</th>
                                                    <th className="px-5 py-3 border-b border-b-neutral-800 bg-neutral-900">Created At</th>
                                                    <th className="px-5 py-3 border-b border-b-neutral-800 bg-neutral-900">Last Used At</th>
                                                    <th className="px-5 py-3 border-b border-b-neutral-800 bg-neutral-900">Total Requests</th>
                                                    <th className="px-5 py-3 border-b border-b-neutral-800 bg-neutral-900">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.data.map((token, index) => (
                                                        <tr key={index}>
                                                            <th className="px-5 py-3 text-center border-b border-r border-neutral-800">{token.name}</th>
                                                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">{humanizeDuration(Date.now() - new Date(token.createdAt).getTime(), { largest: 1, round: true })} ago</td>
                                                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">{humanizeDuration(Date.now() - new Date(token.lastUsedAt).getTime(), { largest: 1, round: true })} ago</td>
                                                            <td className="px-5 py-3 text-center border-b border-r border-neutral-800">{token.totalRequests.toLocaleString()}</td>
                                                            <td className="px-5 py-3 text-center border-b border-b-neutral-800">
                                                                <button type="button" className="mx-auto button button-sm button-danger" onClick={() => mutation.mutate(token)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        : <p className="mt-2 text-neutral-400">There does not seem to be any tokens here. Why not create one?</p>
                            }
                        </div>
                    </>
            }
        </div>
    );
}