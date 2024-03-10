'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import createApplication from '@/actions/createApplication';
import LoadingIcon from '@/assets/icons/loading.svg';
import { useQueryClient } from '@tanstack/react-query';

export default function NewApplicationForm({ className = '' }) {
    const { push } = useRouter();
    const queryClient = useQueryClient();

    const form = useFormik({
        initialValues: {
            name: '',
            shortDescription: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(2, 'Must be at least 2 characters').max(64, 'Must be at most 64 characters').required('Required'),
            shortDescription: Yup.string().min(30, 'Must be at least 30 characters').max(480, 'Must be at most 480 characters').required('Required')
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setStatus(null);
            setSubmitting(true);

            try {
                const result = await createApplication(values, window.localStorage.getItem('session'));

                queryClient.invalidateQueries({ queryKey: ['applications'] });

                push(`/applications/${result.id}`);
            } catch (e) {
                setStatus({ error: e.message });
                setSubmitting(false);
            }
        }
    });

    return (
        <form className={`box ${className}`} onSubmit={form.handleSubmit}>
            <div className="flex flex-col gap-3">
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="name">Name</label>
                        {form.errors.name ? <p className="mt-1 text-sm text-red-400">{form.errors.name}</p> : null}
                    </div>
                    <input type="text" className={`input ${form.errors.name ? 'input-danger' : ''} mt-1`} id="name" placeholder="My New Application" onChange={form.handleChange} onBlur={form.handleBlur} autoFocus={true} />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="shortDescription">Short Description</label>
                        {form.errors.shortDescription ? <p className="mt-1 text-sm text-red-400">{form.errors.shortDescription}</p> : null}
                    </div>
                    <textarea className={`input ${form.errors.shortDescription ? 'input-danger' : ''} mt-1`} id="shortDescription" rows="5" onChange={form.handleChange} onBlur={form.handleBlur} />
                    <p className="mt-1 text-sm leading-7 text-neutral-500">Just a short description to describe what your application will be used for. This can be changed at a later time.</p>
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 button" disabled={!form.isValid || form.isSubmitting}>
                    {
                        form.isSubmitting
                            ? <LoadingIcon width="24" height="24" />
                            : <span>Create Application</span>
                    }
                </button>
                {
                    form.status?.error
                        ? <p className="text-sm text-red-400">{form.status.error}</p>
                        : null
                }
            </div>
        </form>
    );
}