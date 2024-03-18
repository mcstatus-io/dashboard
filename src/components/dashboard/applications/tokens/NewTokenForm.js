'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingIcon from '@/assets/icons/loading.svg';
import CornerDownLeftIcon from '@/assets/icons/corner-down-left.svg';
import createToken from '@/actions/createToken';
import Link from 'next/link';
import CopyToClipboardButton from '@/components/CopyToClipboardButton';
import { useQueryClient } from '@tanstack/react-query';

export default function NewTokenForm({ applicationID, className }) {
    const queryClient = useQueryClient();

    const form = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(2, 'Must be at least 2 characters').max(64, 'Must be at most 64 characters').required('Required')
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setStatus(null);
            setSubmitting(true);

            try {
                const result = await createToken(applicationID, values, window.localStorage.getItem('session'));

                if (result.success) {
                    queryClient.invalidateQueries({ queryKey: ['application', applicationID, 'tokens'] });

                    setStatus({ success: true, data: result.data });
                } else {
                    setStatus({ error: result.message });
                }
            } catch (e) {
                setStatus({ error: e.message });
            }

            setSubmitting(false);
        }
    });

    return (
        form.status?.success
            ? <div className="box">
                <p>Your token was successfully generated for this application. You will use this code to make API requests, so please make sure that you store this code somewhere, or you will not be able to access it again without creating a new token.</p>
                <pre className="flex items-center gap-3 mt-3 box">
                    <code>{form.status.data.token}</code>
                    <CopyToClipboardButton text={form.status.data.token} />
                </pre>
                <Link href={`/applications/${applicationID}/tokens`} className="inline-block">
                    <div className="flex items-center gap-2 mt-3 button w-fit">
                        <CornerDownLeftIcon width="18" height="18" />
                        <span>Back to Tokens List</span>
                    </div>
                </Link>
            </div>
            : <form className={`box ${className}`} onSubmit={form.handleSubmit}>
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="label" htmlFor="name">Name</label>
                            {form.errors.name ? <p className="mt-1 text-sm text-red-400">{form.errors.name}</p> : null}
                        </div>
                        <input type="text" className={`input ${form.errors.name ? 'input-danger' : ''} mt-1`} id="name" placeholder="My New Application" onChange={form.handleChange} onBlur={form.handleBlur} autoFocus={true} />
                    </div>
                    <button type="submit" className="flex items-center justify-center gap-2 button" disabled={!form.isValid || form.isSubmitting}>
                        {
                            form.isSubmitting
                                ? <LoadingIcon width="24" height="24" />
                                : <span>Create Token</span>
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