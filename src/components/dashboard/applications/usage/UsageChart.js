'use client';

import 'chart.js/auto';

import { Line } from 'react-chartjs-2';
import getApplicationUsage from '@/actions/getApplicationUsage';
import { useQuery } from '@tanstack/react-query';
import LoadingIcon from '@/assets/icons/loading.svg';

export default function UsageChart({ applicationID, className = '' }) {
    const { isPending, error, data } = useQuery({
        queryKey: ['applications', applicationID, 'usage'],
        queryFn: () => getApplicationUsage(applicationID, window.localStorage.getItem('session'))
    });

    return (
        isPending || error || !data.success
            ? <div className="flex items-center justify-center py-24 box">
                <LoadingIcon width="64" height="64" />
            </div>
            : <div className={`box ${className}`}>
                <Line
                    data={{
                        labels: data.data.map((value) => new Date(value.timestamp)),
                        datasets: [{
                            label: 'Request Count',
                            data: data.data.map((value) => value.requestCount),
                            borderWidth: 1,
                            tension: 0.5
                        }]
                    }}
                    options={{
                        elements: {
                            point: {
                                borderWidth: 0,
                                radius: 0,
                                hitRadius: 10
                            }
                        }
                    }}
                />
            </div>
    );
}