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
import { useTagsStore } from "../stores/tags";

export default function Content() {
  const { posts, setPosts } = usePostsStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const { setTags } = useTagsStore();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const responses = await Promise.all([
          axios.get("/api/posts"),
          axios.get("/api/tags"),
        ]);

        setPosts(responses[0].data.posts);
        setTags(responses[1].data.tags);
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
    <div className="content p-3 overflow-y-auto" style={{ maxHeight: "90vh" }}>
      <div className="d-flex flex-column align-items-center">
        {error && <p className="text-danger">{error}</p>}
        {loading && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center">No posts found</p>
      )}

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
                <span className="small">
                  {post.published ? "Published" : "Unpublished"}
                </span>
                <span className="small ms-2">
                  {post.postTags.map((postTag) => (
                    <span
                      key={postTag.id}
                      className="badge text-bg-secondary me-1"
                    >
                      {postTag.tag.name}
                    </span>
                  ))}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
