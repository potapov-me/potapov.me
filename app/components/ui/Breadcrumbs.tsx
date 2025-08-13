import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              {item.href ? (
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-gray-700">{item.label}</span>
              )}
              {index < items.length - 1 && (
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-400 mx-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
