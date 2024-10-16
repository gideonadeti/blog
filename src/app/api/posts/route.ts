import { readPosts, createPost } from "../../../../prisma/db";

export async function GET() {
  try {
    const posts = await readPosts();

    return Response.json({ posts }, { status: 200 });
  } catch (error) {
    console.log(error);

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
    const { title, content } = body;

    if (!title || !content) {
      return Response.json(
        {
          error: "Title and content are required",
        },
        { status: 400 }
      );
    }

    const post = await createPost(title, content);

    return Response.json({ post }, { status: 201 });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
