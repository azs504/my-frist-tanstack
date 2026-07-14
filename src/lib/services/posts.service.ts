import { db } from "../db";

export async function getUserPostsService(userId: string) {
  const posts = await db.post.findMany({
    where: { userId },
    include: {
      tags: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // XXX: test data
  //   const dummyPosts = [
  //     {
  //       id: "1",
  //       title: "Post 1",
  //       content:
  //         "Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 ",
  //       location: "Location 1",
  //       category: "Category 1",
  //       createdAt: new Date(),
  //       tags: ["tag1", "tag2"],
  //       commentCount: 5,
  //     },
  //     {
  //       id: "2",
  //       title: "Post 2",
  //       content: "Content 2",
  //       location: "Location 2",
  //       category: "Category 2",
  //       createdAt: new Date(),
  //       tags: ["tag1", "tag2"],
  //       commentCount: 5,
  //     },
  //   ];

  //   return dummyPosts;

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.category,
    location: post.location,
    commentCount: post.comments.length,
    tags: post.tags.map((tag) => tag.tagId),
    createdAt: post.createdAt,
  }));
}

export async function deletePostService(postId: string) {
  await db.post.delete({
    where: { id: postId },
  });

  return { success: true };
}

export async function createPostService({
  userId,
  title,
  content,
  category,
  location,
  tags,
}: {
  userId: string;
  title: string;
  content: string;
  category: string;
  location: string;
  tags: string[];
}) {
  await db.post.create({
    data: {
      title,
      content,
      category,
      location,
      tags: {
        create: tags.map((tag) => ({ tagId: tag })),
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return { success: true };
}

export async function getCommentByUserIdService(userId: string) {
  const comments = await db.comment.findMany({
    where: { userId },
    include: {
      post: {
        include: { user: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    postTitle: comment.post.title,
    postAuthor: comment.post.user.name,
  }));
}
