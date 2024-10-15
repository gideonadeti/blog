import { seedPosts } from "../../../prisma/db";

export async function GET() {
  try {
    await seedPosts();

    return Response.json(
      {
        message: "Posts seeded successfully",
      },
      { status: 200 }
    );
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
