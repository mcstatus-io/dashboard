'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import DiscordIcon from '@/assets/icons/discord.svg';
import GitHubIcon from '@/assets/icons/github.svg';
import LoadingIcon from '@/assets/icons/loading.svg';

export default function SignupForm({ className }) {
    const form = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().min(1, 'Must be at least 1 character').max(36, 'Must be at most 36 characters').required('Required'),
            email: Yup.string().email('Must be a valid email address').required('Required'),
            password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Confirm password must match password').required('Required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            // TODO
        }
    });

    return (
        <form className={className} onSubmit={form.handleSubmit}>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="label" htmlFor="firstName">First Name</label>
                    <input type="text" className="input mt-1" id="firstName" placeholder="John" onChange={form.handleChange} onBlur={form.handleBlur} autoFocus={true} />
                    {form.errors.firstName ? <p className="text-sm mt-1 text-red-400">{form.errors.firstName}</p> : null}
                </div>
                <div>
                    <label className="label" htmlFor="email">Email</label>
                    <input type="email" className="input mt-1" id="email" placeholder="me@mycompany.com" onChange={form.handleChange} onBlur={form.handleBlur} />
                    {form.errors.email ? <p className="text-sm mt-1 text-red-400">{form.errors.email}</p> : null}
                </div>
                <div>
                    <label className="label" htmlFor="password">Password</label>
                    <input type="password" className="input mt-1" id="password" onChange={form.handleChange} onBlur={form.handleBlur} />
                    {form.errors.password ? <p className="text-sm mt-1 text-red-400">{form.errors.password}</p> : null}
                </div>
                <div>
                    <label className="label" htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" className="input mt-1" id="confirmPassword" onChange={form.handleChange} onBlur={form.handleBlur} />
                    {form.errors.confirmPassword ? <p className="text-sm mt-1 text-red-400">{form.errors.confirmPassword}</p> : null}
                </div>
                <button type="submit" className="button flex items-center justify-center gap-2" disabled={!form.isValid || form.isSubmitting}>
                    {
                        form.isSubmitting
                            ? <LoadingIcon width="24" height="24" />
                            : <>
                                <span>Submit</span>
                                <ArrowRightIcon width="16" height="16" className="text-neutral-500" />
                            </>
                    }
                </button>
                <Link href="/auth/login">
                    <span className="link">Login to existing account</span>
                </Link>
                <div className="flex items-center gap-3 my-5">
                    <div className="h-0.5 bg-neutral-900 grow" />
                    <span className="text-sm text-neutral-500">OR</span>
                    <div className="h-0.5 bg-neutral-900 grow" />
                </div>
                <a href="#" className="button button-discord flex items-center justify-center gap-2">
                    <DiscordIcon width="20" height="20" />
                    <span>Log in with Discord</span>
                </a>
                <a href="#" className="button button-github flex items-center justify-center gap-2">
                    <GitHubIcon width="20" height="20" />
                    <span>Log in with GitHub</span>
                </a>
            </div>
        </form>
    );
}