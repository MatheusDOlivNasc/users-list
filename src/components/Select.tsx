"use client";

import { useState } from "react";
import Button from "./Button";

interface Props {
  title?: string;
  list: string[];
  value: string;
  onChange(value: string): void;
  width?: `w-${number}`
}

export default function Select({ title, list, value, width, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className={`relative ${width}`}
        onMouseLeave={() => setIsOpen(false)}
        // onTouchEnd={() => setIsOpen(false)}
        title={title}
      >
        <button
          type="button"
          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-black sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">{value}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-0 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {list?.map((item, index) => (
              <li
                key={index}
                className="relative cursor-default select-none text-gray-900"
                id="listbox-option-0"
              >
                <Button
                  baseStyle="all"
                  color="white"
                  className="py-2 pl-3 pr-9"
                  onClick={() => onChange(item)}
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal">
                      {item}
                    </span>
                  </div>
                  {item === value && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-black">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
