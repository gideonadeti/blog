import { Post } from "@prisma/client";

export interface PostsStore {
  posts: Post[];

  setPosts: (newPosts: Post[]) => void;
  setPost: (newPost: Post) => void;
  clearPosts: () => void;
}
