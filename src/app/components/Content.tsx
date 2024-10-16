"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { usePostsStore } from "../stores/posts";
import { useSearchParams } from "next/navigation";

export default function Content() {
  const { posts, setPosts } = usePostsStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

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

  useEffect(() => {
    if (filter === "published") {
      setFilteredPosts(posts.filter((post) => post.published));
    } else if (filter === "unpublished") {
      setFilteredPosts(posts.filter((post) => !post.published));
    } else {
      setFilteredPosts(posts);
    }
  }, [filter, posts]);

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

      <ul className="list-group list-group-flush">
        {filteredPosts.length > 0 &&
          filteredPosts.map((post) => (
            <li key={post._id} className="list-group-item">
              <p>{post.title}</p>
              <p>{post.content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
