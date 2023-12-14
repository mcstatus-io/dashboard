import DiscordAuthHandler from '@/components/DiscordAuthHandler';

export const metadata = {
    title: 'Discord Login'
};

export default function Page() {
    return (
        <DiscordAuthHandler />
    );
}