"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const sidebarNavs = [
  { name: "All", filter: "all" },
  { name: "Published", filter: "published" },
  { name: "Unpublished", filter: "unpublished" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

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
      <div>
        <div
          className="btn text-decoration-none bg-light px-2 py-1 rounded w-100"
          onClick={() => setOpen(!open)}
        >
          Create post
        </div>
      </div>
      <CreatePostModal open={open} setOpen={setOpen} />
    </div>
  );
}

function CreatePostModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Modal
      show={open}
      onHide={() => setOpen(!open)}
      backdrop="static"
      keyboard={false}
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={15} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setOpen(!open)}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-primary">
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
}
