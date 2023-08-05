import { useNavigate } from "react-router-dom";

function NavBar(){
  const navigate = useNavigate();
  function handleLogOut(event: any){
    localStorage.removeItem('token');
    navigate("/login")
  }

    return(<nav className="navbar navbar-expand-lg  navbar-custom">
    <div className="container-fluid">
      <a href="/">
      <img src="/photos/logo.png" className ="header-logo"alt="logo"/>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 header-items">
          <li className="nav-item">
            <a className="nav-link active header-item" aria-current="page" href="/">Upcoming Events</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active header-item" aria-current="page" href="/monthlySchedule">Schedule</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active header-item" aria-current="page" href="/albums">Albums Links</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active header-item" aria-current="page" href="/forms">Form Responses</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active header-item" aria-current="page" href="/posts">Posts</a>
          </li>
          <li className="nav-item">
            <button className="nav-link active header-item" aria-current="page" onClick={(event) => handleLogOut(event)}>Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>)
}
export default NavBar