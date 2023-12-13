'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import postLogin from '@/actions/postLogin';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import LoadingIcon from '@/assets/icons/loading.svg';
import LoginWithButtons from '@/components/LoginWithButtons';

export default function LoginForm({ className }) {
    const { push } = useRouter();

    const form = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Must be a valid email address').required('Required'),
            password: Yup.string().min(6, 'Must be at least 6 characters').required('Required')
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setSubmitting(true);

            try {
                const result = await postLogin(values);

                window.localStorage.setItem('session', result.id);

                push('/dashboard');
            } catch (e) {
                setStatus({ error: e.message });
                setSubmitting(false);
            }
        }
    });

    return (
        <form className={className} onSubmit={form.handleSubmit}>
            <div className="flex flex-col gap-3">
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="email">Email</label>
                        {form.errors.email ? <p className="text-sm mt-1 text-red-400">{form.errors.email}</p> : null}
                    </div>
                    <input type="email" className={`input ${form.errors.email ? 'input-danger' : ''} mt-1`} id="email" placeholder="me@mycompany.com" onChange={form.handleChange} onBlur={form.handleBlur} autoFocus={true} />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="password">Password</label>
                        {form.errors.password ? <p className="text-sm mt-1 text-red-400">{form.errors.password}</p> : null}
                    </div>
                    <input type="password" className={`input ${form.errors.password ? 'input-danger' : ''} mt-1`} id="password" onChange={form.handleChange} onBlur={form.handleBlur} />
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
                    <Link href="/auth/signup">
                        <span className="link">Create account</span>
                    </Link>
                    <Link href="/auth/forgot">
                        <span className="link">Forgot password</span>
                    </Link>
                </div>
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