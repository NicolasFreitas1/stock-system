export function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("access_token")
    : null;
}
