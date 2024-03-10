import { useState } from 'react';
import CheckIcon from '@/assets/icons/check.svg';
import CopyIcon from '@/assets/icons/copy.svg';
import CloseIcon from '@/assets/icons/x.svg';

export default function CopyToClipboardButton({ className = '', size = 16, text }) {
    const [state, setState] = useState('none');

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(text);

            setState('success');
        } catch (e) {
            console.error(e);

            setState('error');
        }

        setTimeout(() => setState('none'), 1000 * 2);
    };

    return (
        <button type="button" className={`p-2 button ${className}`} title="Copy to Clipboard" onClick={handleClick} disabled={state !== 'none'}>
            {
                state === 'none'
                    ? <CopyIcon width={size} height={size} />
                    : state === 'success'
                        ? <CheckIcon width={size} height={size} className="text-green-400" />
                        : <CloseIcon width={size} height={size} className="text-red-400" />
            }
        </button>
    );
}