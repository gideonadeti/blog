"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useRouter } from "next/navigation";

import { usePostsStore } from "@/app/stores/posts";
import { ExtendedPost } from "@/app/types";
import formatDate from "@/app/utils/format-date";
import CreatePostModal from "@/app/components/CreatePostModal";

export default function Post({ params }: { params: { postId: string } }) {
  const postId = params.postId;
  const { posts, deletePost } = usePostsStore();
  const [post, setPost] = useState<ExtendedPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showCPModal, setShowCPModal] = useState(false);
  const [initialValue, setInitialValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const foundPost = posts.find((post) => post.id === postId);
    setPost(foundPost || null);
  }, [postId, posts]);

  if (!post) {
    return <div>Loading or post not found</div>;
  }

  function handleEdit() {
    if (!post) {
      return;
    }

    const rawHTML = `<p>${post.postTags
      .map((postTag) => `#${postTag.tag.name}`)
      .join(", ")}</p>\n<p>/sep</p>\n${post.title}\n<p>/sep</p>\n${
      post.content
    }</p>`;

    setInitialValue(rawHTML);
    setShowCPModal(true);
  }

  async function togglePublish() {
    try {
      setLoading(true);

      const response = await axios.put(`/api/posts/${post?.id}`, {
        published: !post?.published,
      });

      setPost(response.data.post);
      setMessage("Post updated successfully");
    } catch (error) {
      console.error(error);

      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this post?");

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.delete(`/api/posts/${post?.id}`);

      setMessage(response.data.message);

      setTimeout(() => {
        if (post) {
          deletePost(post.id);
        }

        router.push("/");
      }, 1500);
    } catch (error) {
      console.error(error);

      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      )}
      {message && (
        <Alert variant="success" dismissible>
          {message}
        </Alert>
      )}
      <div className="mb-3 d-flex">
        <small className="fw-semibold">{formatDate(post.updatedAt)}</small>
        <span className="mx-1">|</span>
        <span className="small fst-italic text-secondary">
          {post.published ? "Published" : "Unpublished"}
        </span>
        <span className="mx-1">|</span>
        <span className="small ms-2">
          {post.postTags.map((postTag) => (
            <span key={postTag.id} className="badge text-bg-secondary me-1">
              {postTag.tag.name}
            </span>
          ))}
        </span>
        <span className="ms-auto d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleEdit}
            disabled={loading}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={togglePublish}
            disabled={loading}
          >
            {post.published ? "Unpublish" : "Publish"}
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </button>
        </span>
      </div>

      <div>
        <div dangerouslySetInnerHTML={{ __html: post.title }} />
        <div
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </div>
      <CreatePostModal
        showCPModal={showCPModal}
        setShowCPModal={setShowCPModal}
        initialValue={initialValue}
        postId={post.id}
      />
    </div>
  );
}
