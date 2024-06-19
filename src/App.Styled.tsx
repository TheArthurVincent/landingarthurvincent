export function authorizationToken() {
  const headers = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("authorization")}`,
    },
  };
  return headers.headers.authorization.split(" ")[1];
}
