import GitHubAuthHandler from '@/components/auth/GitHubAuthHandler';

export const metadata = {
    title: 'GitHub Login'
};

export default function Page() {
    return (
        <GitHubAuthHandler />
    );
}