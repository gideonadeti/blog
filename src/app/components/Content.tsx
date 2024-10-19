"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { usePostsStore } from "../stores/posts";
import { useTagsStore } from "../stores/tags";
import { ExtendedPost } from "../types";
import Post from "./Post";

export default function Content() {
  const { posts, setPosts } = usePostsStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState<ExtendedPost[]>([]);
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const { setTags } = useTagsStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsResponse, tagsResponse] = await Promise.all([
          axios.get("/api/posts"),
          axios.get("/api/tags"),
        ]);

        setPosts(postsResponse.data.posts);
        setTags(tagsResponse.data.tags);
      } catch (error) {
        console.error(error);

        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [setPosts, setTags]);

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
    <div className="content p-3 overflow-y-auto" style={{ maxHeight: "90vh" }}>
      <div className="d-flex flex-column align-items-center">
        {error && <p className="text-danger">{error}</p>}
        {loading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>

      {!loading && filteredPosts.length === 0 && (
        <p className="text-center">No posts found</p>
      )}

      <ul className="list-group list-group-flush">
        {filteredPosts.length > 0 &&
          filteredPosts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
    </div>
  );
}
