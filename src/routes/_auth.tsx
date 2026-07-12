import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useUserProfile } from "#/providers/useUserProfile";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const { isLogin } = useUserProfile();

  if (!isLogin) {
    return (
      <div className="flex items-center justify-center p-8">
        <h1>Please log in to access this page</h1>
      </div>
    );
  }

  return <Outlet />;
}
