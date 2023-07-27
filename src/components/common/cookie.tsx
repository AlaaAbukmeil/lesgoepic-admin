import Cookies from "js-cookie";

let token = Cookies.get("token");
const requestOptions: any = {
  method: "GET",
  mode: "cors",

  headers: { Authorization: `Bearer ${token}` },
  
};

export const handleAuth = (status: number) => {
    if(status == 401){
        window.location.href = '/login';
    }
}

export default requestOptions;
