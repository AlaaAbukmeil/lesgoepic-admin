import proxyUrl from "./variables";
function Login() {

  return (
    <div>
      <div className="container mt-5">
        <h1>LesGo Epic Admin Login</h1>
      </div>
      <div className="">
        <form action={proxyUrl + "/auth/google"}>
        <button className="fabIcon"  type="submit"><i className="fab fa-google icon"></i></button>
        </form>
        
      </div>
    </div>
  );
}
export default Login;
