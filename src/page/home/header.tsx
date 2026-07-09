import { BaseLabel } from "#/components/labels.tsx";
import { BaseInput } from "#/components/inputs";
import { GoSearch } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import { Popup } from "#/components/popup";
import { useState } from "react";
import { PrimaryButton } from "#/components/buttons";

export default function Header() {
  const [displayPopup, setDisplayPopup] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="container mx-auto flex flex-row items-center justify-between px-8 py-3">
        <div className="flex flex-row items-center gap-2">
          <BaseLabel color="DarkRed">租屋</BaseLabel>

          <h1 className="font-bold text-white">公開誌</h1>
        </div>

        <div className="relative w-96">
          <input
            type="text"
            placeholder="搜尋文章、標籤..."
            className="w-full rounded-2xl border border-[#45403B] bg-[#1D1918] px-4 py-1 text-white outline-none focus:border-[#7E7771]"
          />
          <GoSearch className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400" />
        </div>

        <div
          onClick={() => {
            setIsRegister(false);
            setDisplayPopup(true);
          }}
          className="flex cursor-pointer items-center gap-2 text-[#D7D3D1] hover:text-white"
        >
          <CiLogin />
          <p>登入</p>
        </div>
      </div>

      <Popup display={displayPopup} onClose={() => setDisplayPopup(false)}>
        <div className="flex min-h-[385px] min-w-[300px] flex-col justify-between gap-3">
          {isRegister ? <Register /> : <Login />}

          <div className="flex flex-row items-center justify-center gap-2">
            <p className="text-sm">
              {isRegister ? "已有帳號？" : "已經有帳號？"}
            </p>
            <p
              onClick={(e) => {
                e.stopPropagation();
                setIsRegister((prev) => !prev);
              }}
              className="cursor-pointer font-bold text-blue-500"
            >
              {isRegister ? "登入" : "立即註冊"}
            </p>
          </div>
        </div>
      </Popup>
    </header>
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-2xl font-bold">加入社群</p>
      <p>用戶名稱</p>
      <BaseInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="您的暱稱"
      />
      <p>電子信箱</p>
      <BaseInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com"
      />
      <p>密碼</p>
      <BaseInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="********"
      />
      <PrimaryButton>建立帳號</PrimaryButton>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-2xl font-bold">登入</p>
      <p>電子信箱</p>
      <BaseInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com"
      />
      <p>密碼</p>
      <BaseInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="********"
      />
      <PrimaryButton>登入</PrimaryButton>
    </div>
  );
}
