import LoginForm from '@/components/LoginForm';

export const metadata = {
    title: 'Login'
};

export default function Page() {
    return (
        <div className="absolute container mx-auto w-[640px] max-w-[90vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl font-light text-center">Login to MCS</h1>
            <LoginForm className="mt-12" />
        </div>
    );
}