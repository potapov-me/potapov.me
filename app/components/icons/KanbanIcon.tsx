import type { IconType } from 'react-icons';

export const KanbanIcon: IconType = (props) => (
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
    {/* Board frame */}
    <rect x="3" y="4" width="18" height="16" rx="2" />
    {/* Columns */}
    <path d="M11 4v16M17 4v16" />
    {/* Cards (dots) */}
    <circle cx="7" cy="8" r="1" fill="currentColor" stroke="none" />
    <circle cx="7" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="13" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="9" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="14" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default KanbanIcon;
