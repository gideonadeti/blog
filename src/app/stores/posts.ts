import { create } from "zustand";
import { PostsStore } from "../types";

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],

  setPosts: (newPosts) => set({ posts: newPosts }),
  setPost: (newPost) => {
    set((state) => ({
      posts: [...state.posts, newPost],
    }));
  },
  updatePost: (postId, updatedPost) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      ),
    }));
  },

  deletePost: (postId) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    }));
  },

  clearPosts: () => set({ posts: [] }),
}));
