import { My } from "#/page/my/my";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/my")({
  component: RouteComponent,
});

function RouteComponent() {
  return <My />;
}
