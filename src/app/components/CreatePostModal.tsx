import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

import { usePostsStore } from "../stores/posts";
import { useTagsStore } from "../stores/tags";
import { CreatePostForm } from "../types";

export default function CreatePostModal({
  showCPModal,
  setShowCPModal,
}: {
  showCPModal: boolean;
  setShowCPModal: (showCPModal: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePostForm>();
  const { setPost } = usePostsStore();
  const { tags } = useTagsStore();

  async function onSubmit(formData: CreatePostForm) {
    try {
      setLoading(true);

      const response = await axios.post("/api/posts", formData);

      setPost(response.data.post);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    reset();
    setShowCPModal(false);
  }

  return (
    <Modal
      show={showCPModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger text-center">{error}</p>}
        {tags.length > 0 ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title", { required: "Title is required" })}
                autoFocus
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
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Select
                multiple
                {...register("tags", { required: "Tags are required" })}
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </Form.Select>
              {errors.tags && (
                <Form.Text className="text-danger">
                  {errors.tags.message}
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
        ) : (
          <p className="text-center">Please create a tag first</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
