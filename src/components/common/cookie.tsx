import Cookies from "js-cookie";

let token: any = Cookies.get("token");

export const getRequestOptions: any = {
  method: "GET",
  'Content-Type': 'application/json',
  headers: { Authorization: `Bearer ${token}` },
};

export const postRequestOptions: any = {
  method: "post",
  'Content-Type': 'application/json',
  headers: { Authorization: `Bearer ${token}` },
};

export const handleAuth = (status: number) => {
  if (status == 401) {
    window.location.href = "/login";
  }
};

export default {}

