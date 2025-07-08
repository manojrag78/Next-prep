import Cookies from "universal-cookie";
const cookies =  new Cookies()
export const setSessionToken = (token: string) => {
  const date = new Date()
  date.setTime(date.getTime() + 1 * 60 * 60 * 1000)

  cookies.set("token", token, {
    expires: date,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge:3600,
  });
};

export const removeSessionToken = (tokenName: string) => {
  cookies.remove(tokenName, { path: "/" });
};

export const getSessionToken = (tokenName: string) => {
  return cookies.get(tokenName);
};
