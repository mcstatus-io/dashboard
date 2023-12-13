'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import DiscordIcon from '@/assets/icons/discord.svg';
import GitHubIcon from '@/assets/icons/github.svg';
import LoadingIcon from '@/assets/icons/loading.svg';

export default function ForgotPasswordForm({ className }) {
    const form = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Must be a valid email address').required('Required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            // TODO
        }
    });

    return (
        <form className={className} onSubmit={form.handleSubmit}>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="label" htmlFor="email">Email</label>
                    <input type="email" className="input mt-1" id="email" placeholder="me@mycompany.com" onChange={form.handleChange} onBlur={form.handleBlur} />
                    {form.errors.email ? <p className="text-sm mt-1 text-red-400">{form.errors.email}</p> : null}
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
                <div className="flex items-center justify-between">
                    <Link href="/auth/login">
                        <span className="link">Back to login page</span>
                    </Link>
                    <Link href="/auth/signup">
                        <span className="link">Create account</span>
                    </Link>
                </div>
            </div>
        </form>
    );
}