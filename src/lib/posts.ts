import { createServerFn } from "@tanstack/react-start";
import {
  getUserPostsService,
  deletePostService,
  createPostService,
  getCommentByUserIdService,
} from "./services/posts.service";
import type { CreatePostInput } from "#/types/post";

export const getUserPosts = createServerFn({ method: "GET" })
  .validator((userId: string) => userId)
  .handler(({ data }) => getUserPostsService(data));

export const postDeletePost = createServerFn({ method: "POST" })
  .validator((postId: string) => postId)
  .handler(({ data }) => deletePostService(data));

export const postCreatePost = createServerFn({ method: "POST" })
  .validator((data: CreatePostInput) => data)
  .handler(({ data }) => createPostService(data));

export const getCommentByUserId = createServerFn({ method: "GET" })
  .validator((userId: string) => userId)
  .handler(({ data }) => getCommentByUserIdService(data));
