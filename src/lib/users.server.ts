import { createServerFn } from "@tanstack/react-start";
import { db } from "./db";

export const fetchUsers = createServerFn({ method: "GET" }).handler(
  async () => {
    const users = await db.userProfile.findMany();
    return users;
  }
);

export const postUsers = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string }) => data)
  .handler(async ({ data }) => {
    const user = await db.userProfile.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
    return user;
  });
