import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Select({
  options,
  onChange,
  disabled,
  placeholder,
  value,
  variant,
  icon,
}) {
  const [selected, setSelected] = useState({});

  const handleChange = (option) => {
    setSelected(option);
    onChange && onChange(option.value);
  };

  return (
    <Listbox disabled={disabled} value={selected} onChange={handleChange}>
      {({ open }) => (
        <div className="mt-1 relative">
          <Listbox.Button className={`relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm disabled:opacity-50 ${variant === 'dark' ? 'bg-black text-white' : 'bg-white border border-gray-300'}`}>
            <span className="flex items-center">
              <span className="block truncate">{value || placeholder}</span>
            </span>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {
                  icon || <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                }
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) => classNames(
                    active ? 'text-white bg-black' : 'text-black',
                    'cursor-default select-none relative py-2 pl-3 pr-9',
                  )}
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'block')}
                        >
                          {option.label}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-black',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
