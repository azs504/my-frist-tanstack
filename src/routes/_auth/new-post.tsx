import { createFileRoute } from "@tanstack/react-router";
import NewPost from "#/page/newPost/newPost";

export const Route = createFileRoute("/_auth/new-post")({
  component: NewPost,
});
