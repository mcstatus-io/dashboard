import GitHubAuthHandler from '@/components/GitHubAuthHandler';

export const metadata = {
    title: 'GitHub Login'
};

export default function Page() {
    return (
        <GitHubAuthHandler />
    );
}