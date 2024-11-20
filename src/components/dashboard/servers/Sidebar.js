'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import GridIcon from '@/assets/icons/grid.svg';
import TrendingUpIcon from '@/assets/icons/trending-up.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import EditIcon from '@/assets/icons/edit.svg';
import ListIcon from '@/assets/icons/list.svg';
import LayoutIcon from '@/assets/icons/layout.svg';
import icon from '@/assets/img/icon.png';

export default function Sidebar() {
    const { id } = useParams();
    const path = usePathname();

    return (
        <nav className="flex flex-col gap-5 min-w-[300px] w-[300px] max-w-[300px] h-full px-5 pb-5 pt-10 border-r border-r-neutral-800 bg-neutral-950">
            <a href="https://mcstatus.io" className="flex items-center justify-center gap-3 px-5 py-3 text-2xl font-black transition-colors rounded hover:bg-neutral-800">
                <Image src={icon} width="48" height="48" alt="Minecraft Server Status" priority />
                <span>MCS</span>
            </a>
            <ul className="flex flex-col gap-1 grow">
                <li className="mt-3">
                    <Link href="/servers">
                        <div className="flex items-center gap-3 px-3 py-2 rounded text-neutral-400 hover:bg-neutral-800 hover:text-white">
                            <ArrowLeftIcon width="16" height="16" />
                            <span>Back to Servers</span>
                        </div>
                    </Link>
                </li>
                <li className="mt-8">
                    <span className="text-sm text-neutral-300">General</span>
                </li>
                <li className="mt-3">
                    <Link href={`/servers/${id}`}>
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === `/servers/${id}` ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <GridIcon width="16" height="16" />
                            <span>Overview</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href={`/servers/${id}/statistics`}>
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === `/servers/${id}/statistics` ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <TrendingUpIcon width="16" height="16" />
                            <span>Statistics</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href={`/servers/${id}/logs`}>
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === `/servers/${id}/logs` ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <ListIcon width="16" height="16" />
                            <span>Status Logs</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href={`/servers/${id}/page`}>
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === `/servers/${id}/page` ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <LayoutIcon width="16" height="16" />
                            <span>Status Page</span>
                        </div>
                    </Link>
                </li>
                <li className="mt-8">
                    <span className="text-sm text-neutral-300">Manage</span>
                </li>
                <li className="mt-3">
                    <Link href={`/servers/${id}/edit`}>
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === `/servers/${id}/edit` ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <EditIcon width="16" height="16" />
                            <span>Edit Details</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href={`/servers/${id}/delete`}>
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === `/servers/${id}/delete` ? 'text-white bg-red-500' : 'text-red-500 hover:bg-neutral-800 hover:text-red-400'}`}>
                            <TrashIcon width="16" height="16" />
                            <span>Delete</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}