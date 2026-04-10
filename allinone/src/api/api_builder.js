import { END_POINTS } from "../features/signup_and_login_feature/api/endpointsConstant";

export function buildURL(path) {
  const baseURL = END_POINTS.baseUrl;
  return new URL(path, baseURL)
}
