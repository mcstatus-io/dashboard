import SignupForm from '@/components/login/SignupForm';

export const metadata = {
    title: 'Sign Up'
};

export default function Page() {
    return (
        <div className="absolute container mx-auto w-[640px] max-w-[90vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl font-light text-center">Create Account</h1>
            <SignupForm className="mt-12" />
        </div>
    );
}