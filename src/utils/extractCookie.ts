export default function extractCookie(cookieName: string) {
  return document.cookie.split("; ").reduce((acc, cookie) => {
    const cookieParts = cookie.split("=");
    if (cookieParts[0] === cookieName) {
      acc = cookieParts[1];
    }
    return acc;
  }, "");
}
