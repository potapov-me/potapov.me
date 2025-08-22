import type { IconType } from 'react-icons';

export const AgileIcon: IconType = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    width="1em"
    height="1em"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Circular arrows to represent iterative cycles */}
    <path d="M20 12a8 8 0 1 0-8 8" />
    <path d="M20 12h-3m3 0-2-2m2 2-2 2" />
  </svg>
);

export default AgileIcon;
