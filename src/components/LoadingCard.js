import LoadingIcon from '@/assets/icons/loading.svg';

export default function LoadingCard({ className = '', size = 40, height = 240 }) {
    return (
        <div className={`box flex items-center justify-center ${className}`} style={{ height: `${height}px` }}>
            <LoadingIcon width={size} height={size} />
        </div>
    );
}