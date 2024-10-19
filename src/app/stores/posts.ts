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

  clearPosts: () => set({ posts: [] }),
}));
