'use client';

import { useState, useEffect } from 'react';

type AutocompleteProps = {
  options: string[];
  onSelect?: (value: string) => void;
  placeholder?: string;
};

const Autocomplete = ({ options, onSelect, placeholder }: AutocompleteProps) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const results = options.filter((opt) =>
      opt.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(results);
  }, [query, options]);

  const handleSelect = (value: string) => {
    setQuery(value);
    setShowDropdown(false);
    if (onSelect) onSelect(value);
  };

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={query}
        placeholder={placeholder || 'Start typing...'}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
          {filteredOptions.map((option, i) => (
            <li
              key={i}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
