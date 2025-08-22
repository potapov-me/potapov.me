import type { IconType } from 'react-icons';

export const ScrumIcon: IconType = (props) => (
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
    {/* Two circles (team and product) */}
    <circle cx="9" cy="10" r="4" />
    <circle cx="16" cy="14" r="3" />
    {/* Sprint arrow */}
    <path d="M4 18h8m0 0-2-2m2 2-2 2" />
  </svg>
);

export default ScrumIcon;
