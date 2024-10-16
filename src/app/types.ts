import { Post } from "@prisma/client";
import { Tag } from "@prisma/client";

export interface PostsStore {
  posts: Post[];

  setPosts: (newPosts: Post[]) => void;
  setPost: (newPost: Post) => void;
  clearPosts: () => void;
}

export interface TagsStore {
  tags: Tag[];

  setTags: (newTags: Tag[]) => void;
  setTag: (newTag: Tag) => void;
  clearTags: () => void;
}
