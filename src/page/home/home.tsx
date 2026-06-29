import { useState } from "react";
import { postUsers, fetchUsers } from "#/lib/users";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

function Home() {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const users = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { mutate: postUsersMutation } = useMutation({
    mutationFn: postUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handlePostUsers = async () => {
    postUsersMutation(
      {
        data: { name, email },
      },
      {
        onSuccess: () => {
          console.log("User created successfully");
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <div className="page-wrap flex justify-center bg-gray-500 py-6">
      <div className="min-w-[400px] bg-red-500">home</div>
    </div>
  );
}

export default Home;
