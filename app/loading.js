import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        className="animate-spin"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      >
        <circle cx="25" cy="25" r="20" stroke="gray" strokeOpacity="0.2" />
        <path
          fill="none"
          stroke="blue"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M25 5a20 20 0 0 1 0 40M25 5a20 20 0 0 0 0 40"
        />
      </svg>
    </div>
  );
};

export default Loading;
