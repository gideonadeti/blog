"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { usePostsStore } from "../stores/posts";

export default function Content() {
  const { posts, setPosts } = usePostsStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await axios.get("/api/posts");

        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);

        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [setPosts]);

  return (
    <div className="content p-3">
      <div className="d-flex flex-column align-items-center">
        {error && <p className="text-danger">{error}</p>}
        {loading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      {posts.map((post) => (
        <>
          <p key={post._id}>{post.title}</p>
          <p key={post._id}>{post.content}</p>
        </>
      ))}
    </div>
  );
}
