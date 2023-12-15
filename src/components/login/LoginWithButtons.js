import DiscordIcon from '@/assets/icons/discord.svg';
import GitHubIcon from '@/assets/icons/github.svg';

export default function LoginWithButtons() {
    return (
        <div className="flex flex-col gap-2">
            <a href={`https://discord.com/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=identify&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI)}&prompt=none`} className="button button-discord flex items-center justify-center gap-2">
                <DiscordIcon width="20" height="20" />
                <span>Log in with Discord</span>
            </a>
            <a href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`} className="button button-github flex items-center justify-center gap-2">
                <GitHubIcon width="20" height="20" />
                <span>Log in with GitHub</span>
            </a>
        </div>
    );
}