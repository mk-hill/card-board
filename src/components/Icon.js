/* eslint-disable max-len */
import React from 'react';

// Icons courtesy of icomoon.io
const icons = {
  check:
    'M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951 1.392 1.392 0 0 1 1.953.27l2.351 3.104 5.911-9.492c.407-.652 1.267-.852 1.921-.445s.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z',
  cross:
    'M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z',
  dots:
    'M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm-7 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 3 7.8zm14 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 17 7.8z',
  pencil:
    'M14.69 2.661c-1.894-1.379-3.242-1.349-3.754-1.266a.538.538 0 0 0-.35.223l-6.883 9.497a2.447 2.447 0 0 0-.462 1.307l-.296 5.624a.56.56 0 0 0 .76.553l5.256-2.01c.443-.17.828-.465 1.106-.849l6.88-9.494a.56.56 0 0 0 .1-.423c-.084-.526-.487-1.802-2.357-3.162zM8.977 15.465l-2.043.789a.19.19 0 0 1-.221-.062 5.145 5.145 0 0 0-1.075-1.03 5.217 5.217 0 0 0-1.31-.706.192.192 0 0 1-.126-.192l.122-2.186.549-.755s1.229-.169 2.833.998c1.602 1.166 1.821 2.388 1.821 2.388l-.55.756z',
  plus:
    'M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601s-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10s.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4s1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z',
  squaredCross:
    'M16 2h-12c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2v-12c0-1.1-0.9-2-2-2zM13.061 14.789l-3.061-3.060-3.061 3.060-1.729-1.728 3.061-3.061-3.060-3.061 1.729-1.729 3.060 3.061 3.059-3.061 1.729 1.729-3.059 3.061 3.060 3.061-1.728 1.728z',
  squaredPlus:
    'M16 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4H9v-4H5V9h4V5h2v4h4v2z',
};

const Icon = ({ icon = 'cross', width = 20, height = 20, title, ...props }) => {
  const path = icons[icon] || icons.cross; // Defaulting again in case prop was given but invalid
  return icon === 'cardboard' ? (
    <svg width={width} height={height} viewBox="0 0 512 512" {...props}>
      <title>Icon courtesy of Freepik</title>
      <path fill="#f5c99d" d="M442.413 300.486L256 201.034l-20.016 183.965L256 512h186.413z" />
      <path fill="#f3e5cb" d="M69.587 300.486V512H256V201.034z" />
      <path fill="#f5c99d" d="M256 201.034H69.587l-51.891 99.452h186.413z" />
      <path fill="#e6a160" d="M256 201.034l51.891 99.452h186.413l-51.891-99.452z" />
      <g fill="#42e0a6">
        <path d="M241 0h30v92.78h-30zM145.824 24.902l27.718-11.482 35.508 85.722-27.718 11.48zM67.404 84.333L88.617 63.12l65.604 65.604-21.213 21.213z" />
      </g>
      <g fill="#00b066">
        <path d="M357.765 128.72l65.604-65.604 21.213 21.213-65.604 65.604zM302.966 99.143l35.508-85.722 27.718 11.482-35.508 85.721z" />
      </g>
    </svg>
  ) : (
    <svg width={width} height={height} {...props}>
      {title ? <title>{title}</title> : ''}
      <path d={path} />
    </svg>
  );
};

export default Icon;
