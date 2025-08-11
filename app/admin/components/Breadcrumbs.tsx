"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const breadcrumbNameMap: { [key: string]: string } = {
    "/admin": "Админка",
    "/admin/projects": "Проекты",
};

const Breadcrumbs = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    return (
        <nav className="mb-4">
            <ol className="flex text-sm text-gray-500">
                {pathSegments.map((segment, index) => {
                    const href = "/" + pathSegments.slice(0, index + 1).join("/");
                    const name = breadcrumbNameMap[href] || segment;
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <li key={href} className="flex items-center">
                            <Link href={href} className={`${isLast ? "text-gray-800" : "hover:underline"}`}>
                                {name}
                            </Link>
                            {!isLast && <span className="mx-2">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;