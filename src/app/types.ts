interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsStore {
  posts: Post[];
  setPosts: (newPosts: Post[]) => void;
  clearPosts: () => void;
}
