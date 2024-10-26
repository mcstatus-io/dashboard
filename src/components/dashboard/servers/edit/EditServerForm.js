'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingIcon from '@/assets/icons/loading.svg';
import DropdownSelect from '@/components/DropdownSelect';
import editServer from '@/actions/editServer';

export default function EditServerForm({ server, className = '' }) {
    const form = useFormik({
        initialValues: {
            name: server.name
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(2, 'Must be at least 2 characters').max(64, 'Must be at most 64 characters').required('Required')
        }),
        onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
            setStatus(null);
            setSubmitting(true);

            try {
                const result = await editServer(server.id, values, window.localStorage.getItem('session')); // TODO add this route

                if (result.success) {
                    resetForm({ values });
                    setStatus({ success: true });
                } else {
                    setStatus({ error: result.message });
                }
            } catch (e) {
                setStatus({ error: e.message });
            }

            setSubmitting(false);
        }
    });

    console.log(server);

    return (
        <form className={`box ${className}`} onSubmit={form.handleSubmit}>
            <div className="flex flex-col gap-3">
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="name">Name</label>
                        {form.errors.name ? <p className="mt-1 text-sm text-red-400">{form.errors.name}</p> : null}
                    </div>
                    <input type="text" className={`input ${form.errors.name ? 'input-danger' : ''} mt-1`} id="name" placeholder="My New Server" defaultValue={form.values.name} onChange={form.handleChange} onBlur={form.handleBlur} />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="type">Type</label>
                        {form.errors.type ? <p className="mt-1 text-sm text-red-400">{form.errors.type}</p> : null}
                    </div>
                    <DropdownSelect
                        appendSelection
                        selected={server.server.type}
                        className="mt-1"
                        disabled
                        options={[
                            { key: 'java', text: 'Java Edition' },
                            { key: 'bedrock', text: 'Bedrock Edition' }
                        ]} />
                </div>
                <div className="flex gap-5">
                    <div className="basis-2/3">
                        <label className="label" htmlFor="hostname">Hostname</label>
                        <input type="text" className="mt-1 input" id="hostname" value={server.server.hostname} placeholder="play.hypixel.net" disabled />
                    </div>
                    <div className="basis-1/3">
                        <label className="label" htmlFor="port">Port</label>
                        <input type="number" className="mt-1 input" id="port" defaultValue={server.server.port} disabled />
                    </div>
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 button" disabled={!form.isValid || form.isSubmitting || !form.dirty}>
                    {
                        form.isSubmitting
                            ? <LoadingIcon width="24" height="24" />
                            : <span>Edit Server</span>
                    }
                </button>
                {
                    form.status?.error
                        ? <p className="text-sm text-red-400">{form.status.error}</p>
                        : form.status?.success
                            ? <p className="text-sm text-green-400">The server details were successfully updated.</p>
                            : null
                }
            </div>
        </form>
    );
}