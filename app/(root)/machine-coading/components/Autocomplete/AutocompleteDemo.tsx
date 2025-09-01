'use client';

import { SetStateAction, useState } from 'react';
import Autocomplete from './Autocomplete';

const options = [
  'JavaScript',
  'Java',
  'Python',
  'C++',
  'C#',
  'Go',
  'Rust',
  'Ruby',
  'Swift',
  'TypeScript',
  'Kotlin',
  'Dart',
];

const AutocompletePage = () => {
  const [selected, setSelected] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">🔍 Autocomplete</h1>
      <Autocomplete
        options={options}
        onSelect={(value: SetStateAction<string>) => setSelected(value)}
        placeholder="Search language..."
      />
      {selected && <p className="mt-4 text-lg">You selected: {selected}</p>}
    </div>
  );
};

export default AutocompletePage;
