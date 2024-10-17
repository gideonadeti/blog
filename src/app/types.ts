import { Post, Tag, Comment } from "@prisma/client";

interface ExtendedPost extends Post {
  tags: Tag[];
  comments: Comment;
}

export interface PostsStore {
  posts: ExtendedPost[];

  setPosts: (newPosts: ExtendedPost[]) => void;
  setPost: (newPost: ExtendedPost) => void;
  clearPosts: () => void;
}

export interface TagsStore {
  tags: Tag[];

  setTags: (newTags: Tag[]) => void;
  setTag: (newTag: Tag) => void;
  clearTags: () => void;
}

export interface CreatePostForm {
  title: string;
  content: string;
  tagIds: string[];
}

export interface CreateTagForm {
  name: string;
}
