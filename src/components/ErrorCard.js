export default function ErrorCard({ className = '', text = 'There was an error while loading this item. Please check the console and try again.', height = 240 }) {
    return (
        <div className={`box flex items-center justify-center ${className}`} style={{ height: `${height}px` }}>
            <p className="text-red-400">{text}</p>
        </div>
    );
}