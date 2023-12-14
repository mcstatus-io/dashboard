'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import ArchiveIcon from '@/assets/icons/archive.svg';
import CrosshairIcon from '@/assets/icons/crosshair.svg';
import GitPullRequestIcon from '@/assets/icons/git-pull-request.svg';
import GridIcon from '@/assets/icons/grid.svg';
import KeyIcon from '@/assets/icons/key.svg';
import MonitorIcon from '@/assets/icons/monitor.svg';
import ServerIcon from '@/assets/icons/server.svg';
import icon from '@/assets/img/icon.png';
import { UserProvider } from '@/components/AuthHandler';

export default function Sidebar() {
    const path = usePathname();
    const user = useContext(UserProvider);

    return (
        <nav className="flex flex-col gap-5 min-w-[300px] h-full px-5 pb-5 pt-10 border-r border-r-neutral-800">
            <a href="https://mcstatus.io" className="flex items-center justify-center gap-3 text-2xl font-black hover:bg-neutral-800 rounded px-5 py-3 transition-colors">
                <Image src={icon} width="48" height="48" alt="Minecraft Server Status" priority />
                <span>MCS</span>
            </a>
            <ul className="flex flex-col gap-1 grow">
                <li>
                    <span className="text-sm text-neutral-300">General</span>
                </li>
                <li className="mt-3">
                    <Link href="/dashboard">
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === '/dashboard' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <MonitorIcon width="16" height="16" />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/applications">
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === '/applications' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <GridIcon width="16" height="16" />
                            <span>Applications</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/servers">
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === '/servers' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <ServerIcon width="16" height="16" />
                            <span>Servers</span>
                        </div>
                    </Link>
                </li>
                <li className="mt-8">
                    <span className="text-sm text-neutral-300">Documentation</span>
                </li>
                <li className="mt-3">
                    <Link href="/docs/revisions">
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === '/docs/revisions' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <GitPullRequestIcon width="16" height="16" />
                            <span>Revisions</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/docs/authentication">
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === '/docs/authentication' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <KeyIcon width="16" height="16" />
                            <span>Authentication</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/docs/caching">
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === '/docs/caching' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <ArchiveIcon width="16" height="16" />
                            <span>Caching</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/docs/routes">
                        <div className={`flex items-center gap-3 px-3 py-2 rounded ${path === '/docs/routes' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
                            <CrosshairIcon width="16" height="16" />
                            <span>Routes</span>
                        </div>
                    </Link>
                </li>
                <li className="mt-auto">
                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-neutral-300">Logged in as...</p>
                        <p className="max-w-full">{user.email}</p>
                        <div className="flex items-center gap-3">
                            <Link href="/account" className="button grow">
                                <span>Settings</span>
                            </Link>
                            <Link href="/auth/logout" className="button grow">
                                <span>Log out</span>
                            </Link>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
}