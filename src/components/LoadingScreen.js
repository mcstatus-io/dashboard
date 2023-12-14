import LoadingIcon from '@/assets/icons/loading.svg';

export default function LoadingScreen() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingIcon width="64" height="64" />
        </div>
    );
}