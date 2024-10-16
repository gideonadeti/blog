import { create } from "zustand";

import { TagsStore } from "../types";

export const usePostsStore = create<TagsStore>((set) => ({
  tags: [],

  setTags: (newTags) => set({ tags: newTags }),
  setTag: (newTag) => {
    set((state) => ({
      tags: [...state.tags, newTag],
    }));
  },
  clearTags: () => set({ tags: [] }),
}));
