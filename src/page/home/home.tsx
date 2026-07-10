import { MdOutlineShield } from "react-icons/md";
import { BaseLabel } from "#/components/labels";
import { IoWarningOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { Color } from "#/components/labels";
import { HeadAndFootWapper } from "#/components/headAndFootWapper";

type PostCategory = "惡房東" | "市場行情" | "租屋技巧" | "社區評價";

type Location =
  | "台北市"
  | "新北市"
  | "基隆市"
  | "桃園市"
  | "新竹市"
  | "新竹縣"
  | "苗栗縣"
  | "台中市"
  | "彰化縣"
  | "南投縣"
  | "雲林縣"
  | "嘉義縣"
  | "台南市"
  | "高雄市"
  | "屏東縣"
  | "宜蘭縣"
  | "花蓮縣"
  | "台東縣";

type PostData = {
  id: string;
  title: string;
  content: string;
  location: Location;
  category: PostCategory;
  isTop: boolean;
  tags: string[];
};

const postDummyData: PostData[] = [
  {
    id: "sjiej",
    title: "信義區房東拒還押金，以「磁磚有裂縫」為由扣留兩個月租金",
    content: `我在信義區租了一間套房住了兩年，合約期滿後搬出，但房東以「磁磚有裂縫」為由，拒絕退還押金，共扣押兩個月租金約 42,000 元。

搬出前我有請房東一起驗屋，當時他說沒問題，也沒有提出任何損壞。但搬出後一週突然傳訊息說要扣押金，並提出所謂的「磁磚裂縫」照片——那些裂縫根本在入住前就存在，我入住時拍的照片也有記錄。

我已向消費者保護官申訴，並諮詢過法律扶助基金會。根據民法規定，房東必須舉證損壞是租客造成的，否則不得扣留押金。

建議大家：
1. 入住前務必拍攝每個角落的照片，並請房東簽名確認
2. 搬出時也要拍照，最好有證人在場
3. 押金糾紛可聯繫消費者保護官（1950）或法律扶助基金會`,
    location: "台北市",
    category: "惡房東",
    isTop: true,
    tags: ["押金糾紛", "信義區", "法律"],
  },
];

function Home() {
  return (
    <HeadAndFootWapper>
      <div className="page-wrap flex flex-col items-center px-[300px] py-6">
        <Hearder />

        {postDummyData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </HeadAndFootWapper>
  );
}

const categoryColors: Record<
  PostCategory,
  { color: keyof typeof Color; borderColor: string }
> = {
  惡房東: {
    color: "Pink",
    borderColor: "#FFC9C9",
  },
  市場行情: {
    color: "LightYellow",
    borderColor: "#FEF086",
  },
  租屋技巧: {
    color: "LightBlue",
    borderColor: "#B3D9FF",
  },
  社區評價: {
    color: "LightGreen",
    borderColor: "#B3FFB3",
  },
};

function PostCard({ post }: { post: PostData }) {
  return (
    <div className="hover:shadow-bg-gray-300 mt-4 w-full rounded-2xl border border-[#EAEAEA] bg-white px-6 py-6 hover:cursor-pointer hover:shadow-lg">
      <div className="flex flex-row items-end gap-2">
        <BaseLabel
          className="flex items-center gap-1 text-[12px] font-bold text-[#9F0812]"
          color={categoryColors[post.category].color}
          borderRadius="15px"
          borderColor={categoryColors[post.category].borderColor}
          border="1px solid #FFC9C9"
        >
          <IoWarningOutline />
          {post.category}
        </BaseLabel>

        {post.isTop && (
          <BaseLabel
            className="text-[10px] font-bold text-[#894B00]"
            color="LightYellow"
            borderRadius="15px"
            borderColor="#FEF086"
            border="1px solid #FEF086"
          >
            置頂
          </BaseLabel>
        )}

        <div className="flex items-center gap-1 text-[12px] font-bold text-[#8F8984]">
          <CiLocationOn />
          {post.location}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[16px] font-bold">{post.title}</p>
        <p className="line-clamp-2 text-[14px] text-[#8F8984]">
          {post.content}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <BaseLabel
            key={tag}
            className="text-[12px] font-bold text-[#3D2E1B]"
            color="LightGray"
            borderRadius="15px"
          >
            ＃{tag}
          </BaseLabel>
        ))}
      </div>

      <div className="mt-4 h-[1px] w-full bg-[#EAEAEA]" />

      <div className="mt-4 flex flex-row items-center gap-2 text-[12px] font-bold text-[#8F8984]">
        <p className="flex items-center gap-1">
          <GoPerson /> 陳小明
        </p>
        <p className="flex items-center gap-1">
          <CiCalendar /> 2025-10-15
        </p>
        <p className="flex items-center gap-1">
          <GoComment /> 1則
        </p>
      </div>
    </div>
  );
}

function Hearder() {
  return (
    <div className="w-full rounded-2xl bg-[#24140D] px-6 py-6">
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
  );
}

export default Home;
