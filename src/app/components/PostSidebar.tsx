"use client";

import { useState } from "react";
import Link from "next/link";

import CreatePostModal from "./CreatePostModal";
import { usePostsStore } from "../stores/posts";

export default function PostSidebar() {
  const [showCPModal, setShowCPModal] = useState(false); // CP -> CreatePost
  const { posts } = usePostsStore();

  return (
    <div
      className="container-fluid position-absolute top-0 bottom-0 border-end d-flex flex-column pb-3"
      style={{ width: "280px" }}
    >
      <div
        className="d-flex flex-column gap-2 overflow-y-auto overflow-x-hidden py-3 pe-2"
        style={{ height: "70vh" }}
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            dangerouslySetInnerHTML={{ __html: post.title }}
            className="sidebar-link text-reset btn btn-light"
          />
        ))}
      </div>
      <div
        className="btn btn-light mt-auto"
        onClick={() => setShowCPModal(true)}
      >
        Create post
      </div>
      <CreatePostModal
        showCPModal={showCPModal}
        setShowCPModal={setShowCPModal}
      />
    </div>
  );
}
