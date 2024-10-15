"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const sidebarNavs = [
  { name: "All", filter: "all" },
  { name: "Published", filter: "published" },
  { name: "Unpublished", filter: "unpublished" },
];

export default function Sidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleNavClick(filter: string) {
    const params = new URLSearchParams(searchParams);

    if (filter) {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      className="container-fluid position-absolute top-0 bottom-0 border-end"
      style={{ width: "280px" }}
    >
      <div className="d-flex flex-column gap-2 mt-3">
        {sidebarNavs.map((nav) => (
          <div
            key={nav.name}
            className="btn text-decoration-none bg-light px-2 py-1 rounded"
            onClick={() => handleNavClick(nav.filter)}
          >
            {nav.name}
          </div>
        ))}
      </div>
    </div>
  );
}
