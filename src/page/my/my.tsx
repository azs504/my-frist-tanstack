import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";

import { HeadAndFootWapper } from "#/components/headAndFootWapper";
import { useUserProfile } from "#/providers/useUserProfile";
import { getUserPosts } from "#/lib/posts";

import { AiOutlineMore } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";

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
  const { userProfile } = useUserProfile();

  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("posts");

  const { data: posts } = useQuery({
    queryKey: ["userPosts", userProfile?.id],
    queryFn: () => getUserPosts({ data: userProfile?.id ?? "" }),
    enabled: !!userProfile?.id,
  });

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
        {activeTab === "posts" && posts?.length === 0 && (
          <p className="font-bold text-[#AFAFAF]">No post yet</p>
        )}

        {activeTab === "replies" && (
          <p className="font-bold text-[#AFAFAF]">No reply yet</p>
        )}

        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function PostCard({
  post,
}: {
  post: {
    id: string;
    title: string;
    content: string;
    location: string;
    category: string;
    createdAt: Date;
    tags: string[];
    commentCount: number;
  };
}) {
  return (
    <div className="flex flex-row justify-between border-b border-gray-200 py-4">
      <div className="flex flex-1 flex-col items-start">
        <p>{post.category}</p>
        <div className="flex flex-row items-center gap-2">
          <p className="font-bold text-gray-400">{post.title}.</p>
          <p className="text-sm text-gray-400/50">
            {post.createdAt.toLocaleString()}
          </p>
        </div>
        <p className="font-bold text-gray-400">
          {post.tags.map((tag) => `#${tag}`).join(" ")}
        </p>
        <p className="line-clamp-1 text-sm text-gray-400">{post.content}</p>
        <div className="flex items-center gap-2 text-gray-400">
          <VscComment size={18} />
          <p>{post.commentCount}</p>
        </div>
      </div>

      <MoreDropdown />
    </div>
  );
}

function MoreDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <AiOutlineMore
        size={24}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer text-gray-400 hover:text-gray-600"
      />
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-28 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
            Edit
          </button>
          <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
