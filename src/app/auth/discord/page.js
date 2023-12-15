import DiscordAuthHandler from '@/components/auth/DiscordAuthHandler';

export const metadata = {
    title: 'Discord Login'
};

export default function Page() {
    return (
        <DiscordAuthHandler />
    );
}