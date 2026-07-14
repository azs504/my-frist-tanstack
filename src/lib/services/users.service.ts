import { db } from "../db";
import type { UserProfile } from "../../types/user";

export async function createUserService(data: {
  email: string;
  name: string;
  password: string;
}) {
  const exists =
    (await db.userProfile.count({
      where: { email: data.email },
    })) > 0;

  if (exists)
    throw new Error(
      JSON.stringify({
        code: 409,
        status: "Conflict",
        message: "Email already registered",
      }),
    );

  return db.userProfile.create({
    data,
  });
}

export async function loginUserService(data: {
  email: string;
  password: string;
}) {
  const user = await db.userProfile.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error(
      JSON.stringify({
        code: 401,
        status: "Unauthorized",
        message: "Invalid email or password",
      }),
    );
  }

  const response: UserProfile = {
    id: user.id,
    email: user.email,
    name: user.name || "",
  };

  return { success: true, user: response };
}
