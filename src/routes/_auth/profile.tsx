import { createFileRoute } from "@tanstack/react-router";
import { useUserProfile } from "#/providers/useUserProfile";

export const Route = createFileRoute("/_auth/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { userProfile } = useUserProfile();

  return (
    <div className="flex items-center justify-center p-8">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Name:</strong> {userProfile?.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile?.email}
          </p>
          <p>
            <strong>ID:</strong> {userProfile?.id}
          </p>
        </div>
      </div>
    </div>
  );
}
