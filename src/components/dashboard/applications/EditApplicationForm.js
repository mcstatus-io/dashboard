'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import editApplication from '@/actions/editApplication';
import LoadingIcon from '@/assets/icons/loading.svg';

export default function EditApplicationForm({ application, className }) {
    const form = useFormik({
        initialValues: {
            name: application.name,
            shortDescription: application.shortDescription
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(2, 'Must be at least 2 characters').max(64, 'Must be at most 64 characters').required('Required'),
            shortDescription: Yup.string().min(30, 'Must be at least 30 characters').max(480, 'Must be at most 480 characters').required('Required')
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setStatus(null);
            setSubmitting(true);

            try {
                await editApplication(application.id, values, window.localStorage.getItem('session'));

                setStatus({ success: true });
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
                        <label className="label" htmlFor="name">Name</label>
                        {form.errors.name ? <p className="text-sm mt-1 text-red-400">{form.errors.name}</p> : null}
                    </div>
                    <input type="text" className={`input ${form.errors.name ? 'input-danger' : ''} mt-1`} id="name" defaultValue={form.values.name} placeholder="My New Application" onChange={form.handleChange} onBlur={form.handleBlur} />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="shortDescription">Short Description</label>
                        {form.errors.shortDescription ? <p className="text-sm mt-1 text-red-400">{form.errors.shortDescription}</p> : null}
                    </div>
                    <textarea className={`input ${form.errors.shortDescription ? 'input-danger' : ''} mt-1`} id="shortDescription" defaultValue={form.values.shortDescription} rows="5" onChange={form.handleChange} onBlur={form.handleBlur} />
                    <p className="leading-7 text-neutral-500 mt-1 text-sm">Just a short description to describe what your application will be used for.</p>
                </div>
                <button type="submit" className="button flex items-center justify-center gap-2" disabled={!form.isValid || form.isSubmitting || !form.dirty}>
                    {
                        form.isSubmitting
                            ? <LoadingIcon width="24" height="24" />
                            : <span>Edit Application</span>
                    }
                </button>
                {
                    form.status?.error
                        ? <p className="text-red-400 text-sm">{form.status.error}</p>
                        : form.status?.success
                            ? <p className="text-green-400 text-sm">The application details were successfully updated.</p>
                            : null
                }
            </div>
        </form>
    );
}