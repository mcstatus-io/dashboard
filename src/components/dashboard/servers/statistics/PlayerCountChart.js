'use client';

import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import { Line } from 'react-chartjs-2';
import getServerPlayerStatistics from '@/actions/getServerPlayerStatistics';
import LoadingIcon from '@/assets/icons/loading.svg';
import { useQuery } from '@tanstack/react-query';

export default function PlayerCountChart({ serverID, className = '' }) {
    const { isPending, error, data } = useQuery({
        queryKey: ['servers', serverID, 'statistics', 'players'],
        queryFn: () => getServerPlayerStatistics(serverID, window.localStorage.getItem('session'))
    });

    return (
        isPending || error || !data.success
            ? <div className={`flex items-center justify-center py-24 box ${className}`}>
                <LoadingIcon width="64" height="64" />
            </div>
            : <div className={`box ${className}`}>
                <Line
                    data={{
                        labels: data.data.map((value) => new Date(value.timestamp)),
                        datasets: [
                            {
                                label: 'Player Count',
                                data: data.data.map((value) => value.playerCount),
                                borderWidth: 1,
                                tension: 0.5
                            }
                        ]
                    }}
                    options={{
                        aspectRatio: 3 / 1,
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        },
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'hour'
                                }
                            },
                            y: {
                                ticks: {
                                    precision: 0
                                }
                            }
                        },
                        elements: {
                            point: {
                                borderWidth: 0,
                                radius: 0,
                                hitRadius: 10
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>
    );
}