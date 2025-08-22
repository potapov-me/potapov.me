import type { IconType } from 'react-icons';

export const FsdIcon: IconType = (props) => (
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
    {/* Layers */}
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <rect x="5" y="10" width="14" height="4" rx="1" />
    <rect x="7" y="16" width="10" height="4" rx="1" />
    {/* Slice markers */}
    <circle cx="9" cy="6" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="15" cy="18" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

export default FsdIcon;
