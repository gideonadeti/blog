import { readPosts, createPost, createPostTag } from "../../../../prisma/db";

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
  try {
    const body = await request.json();
    const { title, content, tagIds } = body;

    if (!title || !content || !tagIds || tagIds.length === 0) {
      return Response.json(
        {
          error: "Title, content, and tags are required",
        },
        { status: 400 }
      );
    }

    const post = await createPost(title, content);

    await Promise.all(
      tagIds.map(async (tagId: string) => {
        await createPostTag(post.id, tagId);
      })
    );

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
