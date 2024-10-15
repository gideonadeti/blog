import { readPosts } from "../../../../prisma/db";

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
