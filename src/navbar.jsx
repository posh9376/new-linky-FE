
import logo from "./assets/logo1.png"
import cart from './assets/cart-large-2-svgrepo-com.svg'


function Navbar() {
    return (
    
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <img src={logo} width={50} height={50} className="mr-3" alt="logo"/>
            <a className="navbar-brand " href="#">LINKY</a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">Products</a>
                </li>
              </ul>
              <form className="d-flex " style={{backgroundColor:'transparent', boxShadow:'none', marginRight:"100px"}} role="search">
                <input className="form-control me-2 " style={{boxShadow:'0 0 5px'}} type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-light" type="submit" >Search</button>
              </form>
            </div>
            <div>
               <img className="cart" src={cart} width={40} alt="cart svg" /> 
            </div>
          </div>
        </nav>

    )
} 

export default Navbar;