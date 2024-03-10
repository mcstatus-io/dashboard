import ChevronDownIcon from '@/assets/icons/chevron-down.svg';
import CheckIcon from '@/assets/icons/check.svg';
import { useEffect, useRef, useState } from 'react';

export default function DropdownSelect({ title, options, selected, appendSelection = false, onChange }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const containerElem = useRef();

    const handleClickOption = (option) => {
        setShowDropdown(false);
        onChange(option.key);
    };

    useEffect(() => {
        const onClick = (event) => {
            if (!showDropdown || containerElem.current.contains(event.target)) return;

            setShowDropdown(false);
        };

        window.addEventListener('click', onClick);

        return () => window.removeEventListener('click', onClick);
    }, [showDropdown, containerElem]);

    return (
        <div className="relative" ref={containerElem}>
            <button type="button" className="flex items-center gap-2 button" onClick={() => options.length > 0 && setShowDropdown(!showDropdown)}>
                <span>{title}{appendSelection ? options.find((opt) => opt.key === selected)?.text ?? '' : ''}</span>
                <ChevronDownIcon width="16" height="16" />
            </button>
            <div className={`absolute left-0 min-w-[240px] mt-1 top-full box p-2 ${showDropdown ? 'block' : 'hidden'}`}>
                <ul className="flex flex-col list-none">
                    {
                        options.map((option, index) => (
                            <li key={index}>
                                <button type="button" className="flex items-center justify-between w-full gap-2 px-3 py-2 text-sm text-left rounded hover:bg-neutral-800" onClick={() => handleClickOption(option)}>
                                    <span>{option.text}</span>
                                    {
                                        selected === option.key
                                            ? <CheckIcon width="16" height="16" />
                                            : null
                                    }
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}