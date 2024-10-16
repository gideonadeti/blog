import { createTag } from "../../../../prisma/db";
import { Tag } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (typeof name !== "string") {
      return Response.json(
        {
          error: "Invalid input type for 'name'. Expected a string.",
        },
        { status: 400 }
      );
    }

    const names = name
      .split(",")
      .map((n) => n.trim().toLowerCase())
      .filter((n) => n.length > 0);

    if (names.length === 0) {
      return Response.json(
        {
          error: "Please enter at least one valid name.",
        },
        { status: 400 }
      );
    }

    const tags: Tag[] = await Promise.all(
      names.map(async (name: string) => {
        return await createTag(name);
      })
    );

    return Response.json({ tags }, { status: 201 });
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
