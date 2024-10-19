import {
  readPosts,
  createPost,
  readPost,
  updatePost,
  updatePostTags,
  createPostTags,
} from "../../../../prisma/db";

export async function GET() {
  try {
    const posts = await readPosts();

    return Response.json({ posts }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { title, content, hashTags, postId } = await request.json();

  if (!title || !content || hashTags.length === 0) {
    return Response.json(
      {
        error: "Title, content, and hashTags are required",
      },
      { status: 400 }
    );
  }

  const tagNames = hashTags
    .replace(/<[^>]+>/g, "") // Remove all HTML tags
    .split(",")
    .map((tagName: string) => tagName.trim().replace("#", "").toLowerCase());

  if (postId) {
    try {
      const updatedPost = await updatePost(postId, title, content);
      await updatePostTags(postId, tagNames);

      const post = await readPost(updatedPost.id);

      return Response.json({ post }, { status: 200 });
    } catch (error) {
      console.error(error);

      return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
  } else {
    try {
      const newPost = await createPost(title, content);

      await createPostTags(newPost.id, tagNames);

      const post = await readPost(newPost.id);

      return Response.json({ post }, { status: 201 });
    } catch (error) {
      console.error(error);

      return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}
