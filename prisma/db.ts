import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function readPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    console.error(error);

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
    console.error(error);

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
    console.error(error);

    throw error;
  }
}

export async function createTag(name: string) {
  try {
    const tag = await prisma.tag.create({
      data: {
        name,
      },
    });

    return tag;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function readTags() {
  try {
    const tags = await prisma.tag.findMany();

    return tags;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function createPostTag(postId: string, tagId: string) {
  try {
    const postTag = await prisma.postTag.create({
      data: {
        postId,
        tagId,
      },
    });

    return postTag;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function readPost(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: true,
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function readTag(name: string) {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        name,
      },
    });

    return tag;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function updatePublish(postId: string, published: boolean) {
  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published,
      },
    });

    return post;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
