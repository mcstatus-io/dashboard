import ForgotPasswordForm from '@/components/ForgotPasswordForm';

export default function Page() {
    return (
        <div className="absolute container mx-auto w-[640px] max-w-[90vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl font-light text-center">Forgot Password</h1>
            <p className="leading-7 text-neutral-300 mt-5">An email will be sent to the provided email address containing a password reset link, if an account exists with that email. If you use GitHub or Discord to sign up, please go back to the login page and sign in using that instead.</p>
            <ForgotPasswordForm className="mt-12" />
        </div>
    );
}