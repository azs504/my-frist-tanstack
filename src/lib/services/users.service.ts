import { db } from "../db";

export async function getUsersService() {
  return db.userProfile.findMany();
}
export async function createUserService(data: { email: string; name: string }) {
  const exists =
    (await db.userProfile.count({
      where: { email: data.email },
    })) > 0;

  if (exists) throw { message: "Email already registered" };

  return db.userProfile.create({
    data,
  });
}
