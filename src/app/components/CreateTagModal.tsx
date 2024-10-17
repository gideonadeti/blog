import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Tag } from "@prisma/client";

import { CreateTagForm } from "../types";
import { useTagsStore } from "../stores/tags";

export default function CreateTagModal({
  showCTModal,
  setShowCTModal,
}: {
  showCTModal: boolean;
  setShowCTModal: (showCTModal: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTagForm>();
  const { setTag } = useTagsStore();
  const [message, setMessage] = useState("");

  async function onSubmit(formData: CreateTagForm) {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await axios.post("/api/tags", formData);
      const tags = response.data.tags;

      if (tags.length > 1) {
        tags.forEach((tag: Tag) => {
          setTag(tag);
        });
      } else {
        setTag(tags[0]);
      }

      setMessage("Tag(s) created successfully");
      reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    reset();
    setShowCTModal(false);
    setError("");
    setMessage("");
  }

  return (
    <Modal
      show={showCTModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger text-center">{error}</p>}
        {message && <p className="text-success text-center">{message}</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: "Name is required" })}
              autoFocus
            />
            <div className="form-text">
              Create multiple tags by separating names with commas
            </div>
            {errors.name && (
              <Form.Text className="text-danger">
                {errors.name.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-end gap-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
