'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingIcon from '@/assets/icons/loading.svg';
import DropdownSelect from '@/components/DropdownSelect';

export default function EditServerForm({ server, className = '' }) {
    const form = useFormik({
        initialValues: {
            name: server.name,
            type: server.type,
            hostname: server.hostname,
            port: server.port
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(2, 'Must be at least 2 characters').max(64, 'Must be at most 64 characters').required('Required'),
            type: Yup.string().oneOf(['java', 'bedrock'], 'Must be either Java or Bedrock Edition').required('Required'),
            hostname: Yup.string().min(1, 'Must be at least 1 character').required('Required'),
            port: Yup.number().integer('Must be an integer').min(0, 'Must be at least 0').max(65535, 'Must be at most 65535').required('Required')
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
                    <input type="text" className={`input ${form.errors.name ? 'input-danger' : ''} mt-1`} id="name" placeholder="My New Application" defaultValue={form.values.name} onChange={form.handleChange} onBlur={form.handleBlur} autoFocus={true} />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="label" htmlFor="type">Type</label>
                        {form.errors.type ? <p className="mt-1 text-sm text-red-400">{form.errors.type}</p> : null}
                    </div>
                    <DropdownSelect
                        appendSelection
                        selected={form.values.type}
                        onChange={(key) => form.setFieldValue('type', key, true)}
                        className="mt-1"
                        options={[
                            { key: 'java', text: 'Java Edition' },
                            { key: 'bedrock', text: 'Bedrock Edition' }
                        ]} />
                </div>
                <div className="flex gap-5">
                    <div className="basis-2/3">
                        <div className="flex items-center justify-between">
                            <label className="label" htmlFor="hostname">Hostname</label>
                            {form.errors.hostname ? <p className="mt-1 text-sm text-red-400">{form.errors.hostname}</p> : null}
                        </div>
                        <input type="text" className={`input ${form.errors.hostname ? 'input-danger' : ''} mt-1`} id="hostname" defaultValue={form.values.hostname} placeholder="play.hypixel.net" onChange={form.handleChange} onBlur={form.handleBlur} />
                    </div>
                    <div className="basis-1/3">
                        <div className="flex items-center justify-between">
                            <label className="label" htmlFor="port">Port</label>
                            {form.errors.port ? <p className="mt-1 text-sm text-red-400">{form.errors.port}</p> : null}
                        </div>
                        <input type="number" className={`input ${form.errors.port ? 'input-danger' : ''} mt-1`} id="port" defaultValue={form.values.port} min="0" max="65535" step="1" onChange={form.handleChange} onBlur={form.handleBlur} />
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
                            ? <p className="text-sm text-green-400">The application details were successfully updated.</p>
                            : null
                }
            </div>
        </form>
    );
}