"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

interface CreateForm {
  title: string;
  content: string;
}

function CreatePostModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateForm>();

  async function onSubmit(data: CreateForm) {
    console.log(data);
  }

  function handleClose() {
    reset();
    setOpen(false);
  }

  return (
    <Modal
      show={open}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <Form.Text className="text-danger">
                {errors.title.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={12}
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && (
              <Form.Text className="text-danger">
                {errors.content.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-end gap-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
