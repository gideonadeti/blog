import {
  readPosts,
  createPost,
  createPostTag,
  readPost,
  readTag,
  createTag,
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
  const { title, content, hashTags } = await request.json();

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

  try {
    const newPost = await createPost(title, content);

    await Promise.all(
      tagNames.map(async (tagName: string) => {
        const tag = await readTag(tagName);

        if (tag) {
          await createPostTag(newPost.id, tag.id);
        } else {
          const newTag = await createTag(tagName);

          await createPostTag(newPost.id, newTag.id);
        }
      })
    );

    const post = await readPost(newPost.id);

    return Response.json({ post }, { status: 201 });
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
