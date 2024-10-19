"use client";

import { useEffect, useState } from "react";
import { usePostsStore } from "@/app/stores/posts";
import { ExtendedPost } from "@/app/types";
import formatDate from "@/app/utils/format-date";

export default function Post({ params }: { params: { postId: string } }) {
  const postId = params.postId;
  const { posts } = usePostsStore();
  const [post, setPost] = useState<ExtendedPost | null>(null);

  useEffect(() => {
    const foundPost = posts.find((post) => post.id === postId);
    setPost(foundPost || null);
  }, [postId, posts]);

  if (!post) {
    return <div>Loading or post not found</div>;
  }

  return (
    <div>
      <div className="mb-3">
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
