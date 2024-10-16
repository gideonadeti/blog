import { create } from "zustand";

import { TagsStore } from "../types";

export const useTagsStore = create<TagsStore>((set) => ({
  tags: [],

  setTags: (newTags) => set({ tags: newTags }),
  setTag: (newTag) => {
    set((state) => ({
      tags: [...state.tags, newTag],
    }));
  },
  clearTags: () => set({ tags: [] }),
}));
