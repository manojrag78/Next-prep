import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-xl space-y-6 p-4 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />

        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded" />
        ))}

        <div className="flex justify-between mt-6">
          <div className="h-8 w-24 bg-gray-300 rounded" />
          <div className="h-8 w-24 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
