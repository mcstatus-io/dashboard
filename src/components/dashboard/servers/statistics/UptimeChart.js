'use client';

import getServerUptimeStatistics from '@/actions/getServerUptimeStatistics';
import LoadingIcon from '@/assets/icons/loading.svg';
import { useQuery } from '@tanstack/react-query';
import dateFormat from 'dateformat';

export default function UptimeChart({ serverID, className = '' }) {
    const { isPending, error, data } = useQuery({
        queryKey: ['servers', serverID, 'statistics', 'uptime'],
        queryFn: () => getServerUptimeStatistics(serverID, window.localStorage.getItem('session'))
    });

    const uptimeItems = [], now = new Date();

    for (let i = 0; i < 90; i++) {
        const timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);

        const item = data?.data.find((uptime) => {
            const t = new Date(uptime.timestamp);

            return t.getUTCFullYear() === timestamp.getFullYear() && t.getUTCMonth() === timestamp.getMonth() && t.getUTCDate() === timestamp.getDate() - i;
        });

        const uptime = item ? item.onlineCount / item.totalCount : null;

        uptimeItems.push(
            <div className={`block relative h-8 ${uptime ? (uptime >= 0.99 ? 'bg-green-400' : uptime >= 0.97 ? 'bg-yellow-400' : uptime >= 0.95 ? 'bg-orange-400' : 'bg-red-400') : 'bg-neutral-800'} rounded-sm grow [&:hover>div]:opacity-100`} key={`uptime-${i}`}>
                <div className="absolute opacity-0 p-3 translate-x-1/2 rounded pointer-events-none right-1/2 bottom-[calc(100%+8px)] bg-neutral-800/50 backdrop-blur min-w-[320px] transition-opacity">
                    <p className="font-bold text-center">{dateFormat(timestamp, 'dddd, mmmm dd, yyyy')}</p>
                    <p className="text-sm text-center text-neutral-400">
                        {
                            uptime
                                ? <span className={uptime ? (uptime >= 0.99 ? 'text-green-400' : uptime >= 0.97 ? 'text-yellow-400' : uptime >= 0.95 ? 'text-orange-400' : 'text-red-400') : 'bg-neutral-800'}>{(uptime * 100).toFixed(3)}%</span>
                                : <span>No data</span>
                        }
                    </p>
                </div>
            </div>
        );
    }

    return (
        isPending || error || !data.success
            ? <div className={`flex items-center justify-center py-24 box ${className}`}>
                <LoadingIcon width="64" height="64" />
            </div>
            : <div className={`box ${className}`}>
                <div className="flex flex-row-reverse justify-between gap-1">
                    {uptimeItems}
                </div>
                <div className="flex justify-between mt-1">
                    <span className="text-sm text-neutral-500">90 days ago</span>
                    <span className="text-sm text-neutral-500">Today</span>
                </div>
            </div>
    );
}