import AlertTriangleIcon from '@/assets/icons/alert-triangle.svg';

export default function MaintenanceScreen() {
    return (
        <div className="absolute flex flex-col items-center gap-3 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <AlertTriangleIcon width="96" height="96" className="text-red-500" />
            <p className="mt-8 text-6xl font-semibold">Oops!</p>
            <p className="text-2xl font-light">You&apos;re just a little too early, as this dashboard is still under construction.</p>
            <a href="https://mcstatus.io" rel="noreferrer" className="mt-8 button button-lg button-pill">Return to Homepage</a>
        </div>
    );
}