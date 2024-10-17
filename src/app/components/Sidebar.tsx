"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import CreatePostModal from "./CreatePostModal";
import CreateTagModal from "./CreateTagModal";

const sidebarNavs = [
  { name: "All", filter: "all" },
  { name: "Published", filter: "published" },
  { name: "Unpublished", filter: "unpublished" },
];

export default function Sidebar() {
  const [showCPModal, setShowCPModal] = useState(false);
  const [showCTModal, setShowCTModal] = useState(false); // CT -> CreateTag

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
      className="container-fluid position-absolute top-0 bottom-0 border-end d-flex flex-column justify-content-between py-3"
      style={{ width: "280px" }}
    >
      <div className="d-flex flex-column gap-2">
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
      <div className="d-flex flex-column gap-2">
        <div
          className="btn text-decoration-none bg-light px-2 py-1 rounded"
          onClick={() => setShowCTModal(true)}
        >
          Create tag
        </div>
        <div
          className="btn text-decoration-none bg-light px-2 py-1 rounded"
          onClick={() => setShowCPModal(true)}
        >
          Create post
        </div>
      </div>
      <CreatePostModal
        showCPModal={showCPModal}
        setShowCPModal={setShowCPModal}
      />
      <CreateTagModal
        showCTModal={showCTModal}
        setShowCTModal={setShowCTModal}
      />
    </div>
  );
}
