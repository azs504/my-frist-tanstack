import { createServerFn } from "@tanstack/react-start";
import {
  createUserService,
  getUsersService,
  loginUserService,
} from "./services/users.service";

export const fetchUsers = createServerFn({ method: "GET" }).handler(
  getUsersService,
);

export const postUsers = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; password: string }) => data)
  .handler(({ data }) => createUserService(data));

export const postLogin = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(({ data }) => loginUserService(data));
