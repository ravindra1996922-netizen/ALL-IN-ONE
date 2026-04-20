import { BASE_URL } from "../../constant/constant";

export function buildURL(path) {
  const baseURL = BASE_URL;
  return new URL(path, baseURL);
}
