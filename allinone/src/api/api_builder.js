export function buildURL(path) {
  const baseURL = END_POINTS.baseUrl;
  return new URL(path, baseURL).toString();
}
