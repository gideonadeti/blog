"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

import { usePostsStore } from "@/app/stores/posts";
import { ExtendedPost } from "@/app/types";
import formatDate from "@/app/utils/format-date";

export default function Post({ params }: { params: { postId: string } }) {
  const postId = params.postId;
  const { posts } = usePostsStore();
  const [post, setPost] = useState<ExtendedPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const foundPost = posts.find((post) => post.id === postId);
    setPost(foundPost || null);
  }, [postId, posts]);

  if (!post) {
    return <div>Loading or post not found</div>;
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
        <button
          className="ms-auto btn btn-sm btn-outline-primary"
          onClick={togglePublish}
          disabled={loading}
        >
          {post.published ? "Unpublish" : "Publish"}
        </button>
      </div>

      <div>
        <div dangerouslySetInnerHTML={{ __html: post.title }} />
        <div
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </div>
      <div className="d-flex mt-3"></div>
    </div>
  );
}
