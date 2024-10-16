interface Post {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostsStore {
  posts: Post[];

  setPosts: (newPosts: Post[]) => void;
  setPost: (newPost: Post) => void;
  clearPosts: () => void;
}
