'use client';

import UserIcon from '@/assets/icons/user.svg';
import SettingsIcon from '@/assets/icons/settings.svg';
import LogOutIcon from '@/assets/icons/log-out.svg';
import Link from 'next/link';
import { useContext } from 'react';
import { UserProvider } from '@/components/auth/AuthHandler';

export default function Header() {
    const user = useContext(UserProvider);

    return (
        <ul className="flex items-center justify-end p-4 border-b border-b-neutral-800 bg-neutral-950">
            <div className="flex items-center gap-3">
                <UserIcon width="16" height="16" />
                <span>{user.email}</span>
                <Link href="/account" className="flex items-center gap-2 button button-sm">
                    <SettingsIcon width="16" height="16" />
                    <span>Settings</span>
                </Link>
                <Link href="/auth/logout" className="flex items-center gap-2 button button-sm button-danger">
                    <LogOutIcon width="16" height="16" />
                    <span>Log out</span>
                </Link>
            </div>
        </ul>
    );
}