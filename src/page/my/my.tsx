import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { HeadAndFootWapper } from "#/components/headAndFootWapper";
import { useUserProfile } from "#/providers/useUserProfile";

export function My() {
  const { userProfile } = useUserProfile();

  return (
    <HeadAndFootWapper>
      <div className="px-[500px] py-6">
        <RoundedStyle>
          <p className="text-[80px]">{userProfile?.name?.[0]}</p>
        </RoundedStyle>

        <BottomSelection />
      </div>
    </HeadAndFootWapper>
  );
}

function RoundedStyle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-t-2xl bg-[#D9D9D9] p-6">
      <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white">
        <div className="flex h-[110px] w-[110px] items-end justify-center rounded-full bg-[#1D7FAC] text-white">
          {children}
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: "posts", label: "Posts" },
  { id: "replies", label: "Replies" },
] as const;

function BottomSelection() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="flex flex-col rounded-b-2xl bg-white p-6">
      <div className="flex flex-row items-center">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={twMerge(
              "flex-1 cursor-pointer text-center",
              activeTab === tab.id && "border-b border-blue-500",
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="my-8 text-center">
        <p className="font-bold text-[#AFAFAF]">
          {activeTab === "posts" ? "No post yet" : "No reply yet"}
        </p>
      </div>
    </div>
  );
}
