import { createFileRoute } from "@tanstack/react-router";
import Home from "#/page/home/home";
import { UserProfileProvider } from "#/providers/useUserProfile";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <UserProfileProvider>
      <Home />
    </UserProfileProvider>
  );
}
