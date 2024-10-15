import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function readPosts() {
  const posts = await prisma.post.findMany();

  return posts;
}
