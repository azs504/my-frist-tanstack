import { useState } from "react";
import { postUsers, fetchUsers } from "#/lib/users";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { MdOutlineShield } from "react-icons/md";
import { BaseLabel } from "#/components/labels";

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
    <div className="page-wrap flex justify-center py-6">
      <div className="min-w-[700px] rounded-2xl bg-[#24140D] px-6 py-6">
        <div className="flex flex-row items-center gap-2">
          <MdOutlineShield size={12} color="#C84F53" />
          <p className="text-sm font-bold text-[#C84F53]">租屋透明化運動</p>
        </div>

        <div className="mt-4 text-2xl font-bold">
          <p className="text-white">讓台灣租屋市場</p>
          <p className="text-[#C84F53]">更透明、更公平</p>
        </div>

        <div className="mt-4 max-w-[500px]">
          <p className="text-[14px] text-[#8F8984]">
            分享你的租屋經驗、揭露惡房東行為、提供市場行情資訊。每一篇文章都讓下一位租客做出更好的決定。
          </p>
        </div>

        <div className="mt-4">
          <BaseLabel
            className="px-2 py-1 text-[16px] font-bold"
            color="DarkRed"
            borderRadius="15px"
          >
            加入社群
          </BaseLabel>
        </div>
      </div>
    </div>
  );
}

export default Home;
