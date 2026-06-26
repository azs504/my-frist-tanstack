import { createServerFn } from "@tanstack/react-start";
import { createUserService, getUsersService } from "./services/users.service";

export const fetchUsers = createServerFn({ method: "GET" }).handler(
  getUsersService
);

export const postUsers = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string }) => data)
  .handler(({ data }) => createUserService(data));
