import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function readPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
        tags: true,
      },
    });

    return posts;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function seedPosts() {
  try {
    await prisma.post.createMany({
      data: [
        {
          title: "My first post",
          content: "This is my first post",
        },
        {
          title: "My second post",
          content: "This is my second post",
        },
        {
          title: "My third post",
          content: "This is my third post",
        },
      ],
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function createPost(title: string, content: string) {
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    return post;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
