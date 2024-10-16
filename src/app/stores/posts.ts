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
  clearPosts: () => set({ posts: [] }),
}));
