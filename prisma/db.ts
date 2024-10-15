import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function readPosts() {
  const posts = await prisma.post.findMany();

  return posts;
}

export async function seedPosts() {
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
}
