"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  isToday,
  isYesterday,
  formatDistanceToNow,
  format,
  isThisYear,
} from "date-fns";

import axios from "axios";

import { usePostsStore } from "../stores/posts";

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

  function formatDate(date: Date) {
    let formattedDate;
    const distanceToNow = formatDistanceToNow(date, { addSuffix: true });

    if (isToday(date)) {
      formattedDate = `${format(date, "h:mm a")} (${distanceToNow})`;
    } else if (isYesterday(date)) {
      formattedDate = `Yesterday at ${format(
        date,
        "h:mm a"
      )} (${distanceToNow})`;
    } else if (isThisYear(date)) {
      formattedDate = `${format(
        date,
        "eee, do MMM 'at' h:mm a"
      )} (${distanceToNow})`;
    } else {
      formattedDate = `${format(
        date,
        "eee, do MMM, yyyy 'at' h:mm a"
      )} (${distanceToNow})`;
    }

    return formattedDate;
  }

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
            <li key={post.id} className="list-group-item">
              <small className="fw-semibold">
                {formatDate(post.updatedAt)}
              </small>
              <div>
                <p>{post.title}</p>
                <p>{post.content}</p>
              </div>
              <div>
                <i className="small">
                  {post.published ? "Published" : "Unpublished"}
                </i>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
