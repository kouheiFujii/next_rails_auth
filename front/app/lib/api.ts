import { Paths, fetcher } from "./fetcher";
import { User } from "./definitions";

export const getMe = async () => {
  return await fetcher<{}, User>(Paths.me).read();
};
