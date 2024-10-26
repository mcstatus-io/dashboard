'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingIcon from '@/assets/icons/loading.svg';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import deleteServer from '@/actions/deleteServer';

export default function DeleteServerForm({ server, className = '' }) {
    const { push } = useRouter();
    const queryClient = useQueryClient();

    const form = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(2, 'Must be at least 2 characters').max(64, 'Must be at most 64 characters').oneOf([server.name], 'Must match the server name').required('Required')
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            setStatus(null);
            setSubmitting(true);

            try {
                const result = await deleteServer(server.id, values, window.localStorage.getItem('session'));

                if (result.success) {
                    queryClient.invalidateQueries({ queryKey: ['servers'] });

                    push('/servers');
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
        <form className={`box ${className}`} onSubmit={form.handleSubmit}>
            <div className="flex flex-col gap-3">
                <p>This action will permanently delete this server, and all obtained statistics will be lost. Please make sure that you remove any links to the status page, as they will quit working. Please type <code>{server.name}</code> in the field below to confirm deletion.</p>
                <hr className="my-3 border-neutral-800" />
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="name">Name</label>
                        {form.errors.name ? <p className="mt-1 text-sm text-red-400">{form.errors.name}</p> : null}
                    </div>
                    <input type="text" className={`input ${form.errors.name ? 'input-danger' : ''} mt-1`} id="name" defaultValue={form.values.name} onChange={form.handleChange} onBlur={form.handleBlur} />
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 button" disabled={!form.isValid || form.isSubmitting || !form.dirty}>
                    {
                        form.isSubmitting
                            ? <LoadingIcon width="24" height="24" />
                            : <span>Delete Server</span>
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