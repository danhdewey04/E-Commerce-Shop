import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyWord] = useState("");
  const auth = useSelector((store) => store.auth);
  const changeInput = (e) => setKeyWord(e.target.value);
  const handleSubmit = () => navigate(`/search?keyword=${keyword}`);
  const totalItems = useSelector(({cart}) => cart.items.reduce((total, item) => total + item.qty, 0));
  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
            <h1>
              <Link to={"/"}>
                <img className="img-fluid" src="images/logo.png" />
              </Link>
            </h1>
          </div>
          <div id="search" className="col-lg-4 col-md-12 col-sm-12">
            <form className="form-inline">
              <input
                className="form-control mt-3"
                type="search"
                placeholder="Tìm kiếm"
                onChange={(e) => setKeyWord(e.target.value)}
                aria-label="Search"
              />
              <button className="btn btn-danger mt-3" onClick={handleSubmit} type="button">
                Tìm kiếm
              </button>
            </form>
          </div>
          <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
            <i className="fa-solid fa-user mr-1" />
            
              {auth.auth.isAuthenticated 
              ? (<> <Link className="mr-2" to="/me">
              {auth.customer.current?.email}
            </Link>
            |
            <Link className="mr-2 ml-2" to="/logout">
              đăng xuất
            </Link>
            |
              </>) 
              : (<><Link className="mr-2" to="/login">
              đăng nhập
            </Link>
            |
            <Link className="mr-2 ml-2" to="/register">
              đăng ký
            </Link>
            |
              </>)}
            <a className="mt-4 mr-2 ml-2" href="#">
              giỏ hàng
              <ul>
                <li>
                  <Link to="/cart">
                  <i className="fas fa-shopping-cart" /> Giỏ hàng của bạn
                  </Link>
                </li>
                <li>
                  <Link to="#" >
                  <i className="fas fa-file-alt" /> Đơn hàng đã mua
                  </Link>
                </li>
              </ul>
            </a>
          <span className="mt-3">{totalItems}</span>
          </div>
        </div>
      </div>
      {/* Toggler/collapsibe Button */}
      <button
        className="navbar-toggler navbar-light"
        type="button"
        data-toggle="collapse"
        data-target="#menu"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </div>
  );
};

export default Header;
