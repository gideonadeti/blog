import { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

import { usePostsStore } from "../stores/posts";

export default function CreatePostModal({
  showCPModal,
  setShowCPModal,
}: {
  showCPModal: boolean;
  setShowCPModal: (showCPModal: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setPost } = usePostsStore();
  const editorRef = useRef(null);

  function handleClose() {
    setShowCPModal(false);
    setError("");
  }

  async function handleSubmit() {
    // hashTagsTitleContent, meaning it consists of the hashTags, Title, and content for the post
    // @ts-expect-error: getContent doesn't exist on never and I'm not sure what to do
    const hashTagsTitleContent = editorRef.current?.getContent();

    if (!hashTagsTitleContent) {
      setError("Please enter a post.");
      return;
    }

    const [hashTags, title, content] = hashTagsTitleContent.split(
      /<p[^>]*>.*?\/sep.*?<\/p>/i
    );

    if (hashTags.length === 0 || title.length === 0 || content.length === 0) {
      setError(
        "Please enter a valid post. Include hashTags, title, and content."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/posts", {
        hashTags,
        title,
        content,
      });

      setPost(response.data.post);
      handleClose();
    } catch (error) {
      console.error(error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show={showCPModal} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger text-center">{error}</p>}
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TinyMCE_API_Key}
          // @ts-expect-error: Type 'Editor' is not assignable to type 'null' and I'm not sure what to do
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div className="d-flex gap-3 mt-3">
          <button
            className="btn btn-secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
