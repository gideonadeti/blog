import { updatePublish, readPost } from "../../../../../prisma/db";

export async function PUT(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;
  const { published } = await req.json();

  try {
    const updatedPost = await updatePublish(postId, published);
    const post = await readPost(updatedPost.id);

    return Response.json({ post }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
