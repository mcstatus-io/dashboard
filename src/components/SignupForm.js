'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import LoadingIcon from '@/assets/icons/loading.svg';
import LoginWithButtons from '@/components/LoginWithButtons';

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
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="firstName">First Name</label>
                        {form.errors.firstName ? <p className="text-sm mt-1 text-red-400">{form.errors.firstName}</p> : null}
                    </div>
                    <input type="text" className={`input ${form.errors.firstName ? 'input-danger' : ''} mt-1`} id="firstName" placeholder="John" onChange={form.handleChange} onBlur={form.handleBlur} autoFocus={true} />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="email">Email</label>
                        {form.errors.email ? <p className="text-sm mt-1 text-red-400">{form.errors.email}</p> : null}
                    </div>
                    <input type="email" className={`input ${form.errors.email ? 'input-danger' : ''} mt-1`} id="email" placeholder="me@mycompany.com" onChange={form.handleChange} onBlur={form.handleBlur} />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="password">Password</label>
                        {form.errors.password ? <p className="text-sm mt-1 text-red-400">{form.errors.password}</p> : null}
                    </div>
                    <input type="password" className={`input ${form.errors.password ? 'input-danger' : ''} mt-1`} id="password" onChange={form.handleChange} onBlur={form.handleBlur} />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="confirmPassword">Confirm password</label>
                        {form.errors.confirmPassword ? <p className="text-sm mt-1 text-red-400">{form.errors.confirmPassword}</p> : null}
                    </div>
                    <input type="password" className={`input ${form.errors.confirmPassword ? 'input-danger' : ''} mt-1`} id="confirmPassword" onChange={form.handleChange} onBlur={form.handleBlur} />
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
                <LoginWithButtons />
            </div>
        </form>
    );
}