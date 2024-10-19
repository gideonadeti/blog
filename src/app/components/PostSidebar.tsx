"use client";

import { useState } from "react";

import CreatePostModal from "./CreatePostModal";

export default function PostSidebar() {
  const [showCPModal, setShowCPModal] = useState(false); // CP -> CreatePost

  return (
    <div
      className="container-fluid position-absolute top-0 bottom-0 border-end d-flex flex-column pb-3"
      style={{ width: "280px" }}
    >
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
