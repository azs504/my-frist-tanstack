import { BaseLabel } from "#/components/labels.tsx";
import { BaseInput } from "#/components/inputs";
import { GoSearch } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Popup } from "#/components/popup";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "#/components/buttons";
import { postUsers } from "#/lib/users";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { useUserProfile } from "#/providers/useUserProfile";
import { useNavigate, useLocation } from "@tanstack/react-router";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin, userProfile } = useUserProfile();

  const [displayPopup, setDisplayPopup] = useState(false);
  const [displayLogoutPopup, setDisplayLogoutPopup] = useState(false);

  const handleLoginAndLogout = () => {
    if (isLogin) {
      setDisplayLogoutPopup(true);
      return;
    }

    setDisplayPopup(true);
  };

  const changePageTo = (page: string) => {
    if (location.pathname === page) return;

    navigate({ to: page });
  };

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="container mx-auto flex flex-row items-center justify-between px-8 py-2">
        <div
          onClick={() => changePageTo("/")}
          className="flex cursor-pointer flex-row items-center gap-2"
        >
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

        <div className="flex cursor-pointer items-center gap-2 text-[#D7D3D1]">
          {userProfile?.name && (
            <div
              onClick={() => changePageTo("/my")}
              className={twMerge(
                "flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 hover:text-white",
                location.pathname === "/my" && "bg-[#2A2624]",
              )}
            >
              <IoPersonCircleOutline className="text-2xl" />
              <p className="text-sm">{userProfile?.name}</p>
            </div>
          )}

          <div
            onClick={handleLoginAndLogout}
            className="flex items-center gap-1 hover:text-white"
          >
            {isLogin ? <CiLogout /> : <CiLogin />}
            <p>{isLogin ? "登出" : "登入"}</p>
          </div>
        </div>

        <LoginAndRegisterPopup
          displayPopup={displayPopup}
          onClose={() => setDisplayPopup(false)}
        />

        <LogoutPopup
          displayPopup={displayLogoutPopup}
          onClose={() => setDisplayLogoutPopup(false)}
        />
      </div>
    </header>
  );
}

function LogoutPopup({
  displayPopup,
  onClose,
}: {
  displayPopup: boolean;
  onClose: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useUserProfile();

  return (
    <Popup display={displayPopup} onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <p className="mx-4 text-center text-xl font-bold text-black">
          確定要登出嗎？
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <PrimaryButton onClick={onClose}>取消</PrimaryButton>
          <SecondaryButton
            onClick={() => {
              if (location.pathname !== "/") navigate({ to: "/" });

              logout();
              onClose();
            }}
          >
            確定
          </SecondaryButton>
        </div>
      </div>
    </Popup>
  );
}

function LoginAndRegisterPopup({
  displayPopup,
  onClose,
}: {
  displayPopup: boolean;
  onClose: () => void;
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleClosePopup = () => {
    onClose();
    setIsRegister(false);
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <Popup display={displayPopup} onClose={handleClosePopup}>
      <div className="flex min-h-[400px] min-w-[300px] flex-col justify-between gap-3 text-black">
        {isRegister ? (
          <Register key={resetTrigger} onClose={handleClosePopup} />
        ) : (
          <Login key={resetTrigger} onClose={handleClosePopup} />
        )}

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
  );
}

function Register({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailConflict, setIsEmailConflict] = useState(false);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setIsEmailConflict(false);
  };

  const createUser = useMutation({
    mutationFn: () =>
      postUsers({
        data: { name: username, email, password },
      }),
    onSuccess: () => {
      resetForm();
      onClose();
    },
    onError: (error) => {
      console.error("Register error:", error);

      const errorData = JSON.parse(error.message);

      if (errorData.code === 409) setIsEmailConflict(true);
    },
  });

  const isDisabled = !username || !email || !password || createUser.isPending;

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
      <div>
        <BaseInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
        />
        <p
          className={twMerge(
            "text-xs",
            isEmailConflict ? "text-red-500" : "text-transparent",
          )}
        >
          *信箱已註冊
        </p>
      </div>
      <p>密碼</p>
      <BaseInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="********"
      />
      <PrimaryButton onClick={() => createUser.mutate()} disabled={isDisabled}>
        建立帳號
      </PrimaryButton>
    </div>
  );
}

function Login({ onClose }: { onClose: () => void }) {
  const { login } = useUserProfile();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setIsLoginError(false);
  };

  const handleLogin = () => {
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          onClose();
          resetForm();
        },
        onError: () => {
          setIsLoginError(true);
        },
      },
    );
  };

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
      <p
        className={twMerge(
          "text-xs",
          isLoginError ? "text-red-500" : "text-transparent",
        )}
      >
        *信箱或密碼錯誤
      </p>
      <PrimaryButton
        onClick={handleLogin}
        disabled={!email || !password || login.isPending}
      >
        登入
      </PrimaryButton>
    </div>
  );
}
